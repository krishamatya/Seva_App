﻿using IMS.Model;
using IMS.Model.Data;
using IMS.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QRCoder;
using System.Drawing;
using System.Drawing.Imaging;
using System.Security.Cryptography;
using System.Text;
using ZXing;
namespace IMS.Services
{
    [System.Runtime.Versioning.SupportedOSPlatform("windows")]
    public class QRCodeService : IQRCodeService
    {
        private readonly AuthenticationDBContext _context;
        private readonly IRepository<ApplicationUser> _userRepository;
        private readonly IRepository<Attendance> _attendanceRepository;
        
        public QRCodeService(AuthenticationDBContext context,IRepository<ApplicationUser> userRpository,IRepository<Attendance> repository) 
        { 
            _context = context;
            _userRepository = userRpository;
            _attendanceRepository = repository;
        }
        //public async Task<int?> RegisterUser(User model)
        //{
        //    await _userRepository.AddAsync(model);
        //    return model.Id;
        //}
        public async Task UpdateBarCode(string data, string? id)
        {
            var user = _context.ApplicationUsers.FirstOrDefault(x => x.UserId == id);
            if (user != null)
            {
                user.barcode = data;
                await _userRepository.UpdateAsync(user);
            }
        }

        public async Task<ApplicationUser> Login(Login user) {
            var data = await _userRepository.FindByCondition(x => x.UserName == user.userName && x.password == user.password);
            return data;
            
        }

        public async Task<string> UserCount()
        {
            var userCount = await _context.ApplicationUsers.CountAsync();
            string userId = "USR" + (userCount + 1).ToString().PadLeft(6, '0');

            return userId;

        }

        public async Task<int> AddAttendence(Attendance attendance)
        {
            await _attendanceRepository.AddAsync(attendance);
            return attendance.AttendanceId;
        }
        public async Task<Attendance?> CheckAttendence(string? id )
        {
            return await _context.Attendances.Where(x=>x.UserId == id && x.CheckInDate!=null).FirstOrDefaultAsync() ?? null;
            
        }
        public async Task<ApplicationUser?> GetUserDetails(string userId)
        {
            return await _context.ApplicationUsers.Include(x => x.Attendances).Where(x => x.UserId == userId).FirstOrDefaultAsync() ?? null;
        }
        public async Task<List<ApplicationUser>?> GetUserDetailList(string userId)
        {
            return await _context.ApplicationUsers.Include(x => x.Attendances).Where(x=>x.UserId != userId).ToListAsync();
        }
        public byte[] GenerateQRCode(string data)
        {
            

            BarcodeWriter barcodeWriter = new BarcodeWriter
            {
                // Choose the barcode format you prefer (e.g., CODE_128, EAN_13, etc.)
                Format = BarcodeFormat.CODE_128, // You can change this to other formats like QR_CODE, EAN_13, etc.
                Options = new ZXing.Common.EncodingOptions
                {
                    Height = 300,
                    Width = 600,
                    Margin = 10
                }
            };

            // Generate the barcode from the combined string 
            var barcodeBitmap = barcodeWriter.Write(data);
            using (var ms = new System.IO.MemoryStream())
            {
                barcodeBitmap.Save(ms,ImageFormat.Png);
                byte[] byteImage = ms.ToArray();
                return byteImage;              
            }
            
        }
        public async Task<ApplicationUser?> VerifyQRCode(string base64String)
        {
             return await _userRepository.FindByCondition(x=>x.EmployeeUniqueId == base64String);
               
        }
        public static string GenerateUserSecret(string username, string phoneNumber)
        {
            string key = GenerateRandomBarcode(32);
            // Combine username and phone number into a single string
            string inputString = username + phoneNumber;

            // Convert the input string into bytes
            byte[] inputBytes = Encoding.UTF8.GetBytes(inputString);

            // Create a new instance of HMACSHA256 using the secret key
            using (HMACSHA256 hmac = new HMACSHA256(Encoding.UTF8.GetBytes(key.ToString())))
            {
                // Compute the hash of the combined input
                byte[] hashBytes = hmac.ComputeHash(inputBytes);

                // Convert the hash bytes to a hexadecimal string
                StringBuilder stringBuilder = new StringBuilder();
                foreach (byte b in hashBytes)
                {
                    stringBuilder.Append(b.ToString("x2"));
                }

                return stringBuilder.ToString();
            }
        }
       public static string GenerateRandomBarcode(int length)
        {
            Random random = new Random();

            // Use LINQ to generate a random barcode as a string of digits
            return new string(Enumerable.Range(0, length)
                                        .Select(_ => random.Next(0, 10).ToString())
                                        .Aggregate((a, b) => a + b).ToArray());
        }
    }
}
        
    

    

