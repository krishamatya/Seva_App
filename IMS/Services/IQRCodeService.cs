
using IMS.Model;

namespace IMS.Services
{
    public interface IQRCodeService
    {
        byte[] GenerateQRCode(string data);
        Task<ApplicationUser?> VerifyQRCode(string scannedData);
        Task<string> UserCount();
        Task UpdateBarCode(string data, string? id);
        Task<int> AddAttendence(Attendance attendance);
        Task<ApplicationUser?> GetUserDetails(string? userId);
        Task<Attendance?> CheckAttendence(string? id);

        Task<ApplicationUser> Login(Login user);
        Task<List<ApplicationUser>?> GetUserDetailList(string userId);
    }
}