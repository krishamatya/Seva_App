using IMS.Model;
using IMS.Repository;
using IMS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.IdentityModel.Tokens;
using QRCoder;
using System.Buffers.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Text;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace AuthenticationService.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IQRCodeService _qrCodeService;
        private readonly IConfiguration _configuration;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        


        public AuthenticationController(IQRCodeService qrCodeService, IConfiguration configuration,UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _qrCodeService = qrCodeService;
            _configuration = configuration;
            _userManager = userManager;
            _signInManager = signInManager;

        }
        [HttpPost("register")]
        //  [System.Runtime.Versioning.SupportedOSPlatform("windows")]
        public async Task<IActionResult> Register([FromBody] User model)
        {
            //
            var user = new IdentityUser { UserName = model.UserName, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.password);

            if (result.Succeeded)
            {

                //
                model.EmployeeUniqueId = QRCodeService.GenerateRandomBarcode(12);
                var userId = await _qrCodeService.RegisterUser(model);

                //after success generate BarCode 
                string qrData = $"{model.EmployeeUniqueId}";
                byte[] qrCodeImage = _qrCodeService.GenerateQRCode(qrData);
                // Let the user save the QR.
                await _qrCodeService.UpdateBarCode(Convert.ToBase64String(qrCodeImage), userId);
                return new JsonResult(new { image = Convert.ToBase64String(qrCodeImage) });
            }
            else {
                return BadRequest("Invalid data.");
            }

        }
        [HttpPost("login/qr")]

        public async Task<IActionResult> LoginWithQRCode([FromBody] Base64Image scannedData)
        {
            var data = await _qrCodeService.VerifyQRCode(scannedData.base64String);

            if (data != null)
            {
                var record = _qrCodeService.CheckAttendence(data.Id);
                if (record.Result == null)
                {
                    await _qrCodeService.AddAttendence(new Attendance
                    {
                        UId = data.Id,
                        CheckInDate = DateTime.Now
                    });
                }
                var claims = new[] { new Claim(ClaimTypes.Name, data.UserName) };
                var jwtSetting = _configuration.GetSection("JwtSetting").Get<JwtSetting>();
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSetting.SecretKey));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: jwtSetting.Issuer,
                    audience: jwtSetting.Audience,
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    id = data.Id
                });

            }

            return Unauthorized("Invalid QR Code.");
        }
        [Authorize]
        [HttpGet("dashboard")]
        public async Task<IActionResult> Get(int id)
        {
            var data = await _qrCodeService.GetUserDetails(id);
            if (data == null)
            {
                return NotFound("User not found.");
            }
            return new JsonResult(ConvertToDTO.ConvertUser(data));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login loginModel)
        {
            
            var user = await _userManager.FindByNameAsync(loginModel.userName);

            if (user != null)
            {
                var result = await _signInManager.CheckPasswordSignInAsync(user, loginModel.password, false);

                if (result.Succeeded)
                {
                    var claims = new[] { new Claim(ClaimTypes.Name, loginModel.userName) }; // Fixed CS1061: Changed 'username' to 'userName'
                    var jwtSetting = _configuration.GetSection("JwtSetting").Get<JwtSetting>();
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSetting.SecretKey));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(
                        issuer: jwtSetting.Issuer,
                        audience: jwtSetting.Audience,
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(30),
                        signingCredentials: creds);

                    return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        id = user.Id,
                        Status = true,
                        StatusMessage = "Login Successful"
                    });
                }
            }
            return Ok(new
            {
                StatusMessage = "Login Unsuccessful",
                Status = false,

            });

        }

        [HttpGet("GetUserList")]
        public async Task<IActionResult> GetUserList() 
        {
           var data= await _qrCodeService.GetUserDetailList();
            return new JsonResult(ConvertToDTO.ConvertUserList(data));
        }

    }
}
