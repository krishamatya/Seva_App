
using IMS.Model;

namespace IMS.Services
{
    public interface IQRCodeService
    {
        byte[] GenerateQRCode(string data);
        Task<User?> VerifyQRCode(string scannedData);
        Task<int?> RegisterUser(User model);
        Task UpdateBarCode(string data, int? id);
        Task<int> AddAttendence(Attendance attendance);
        Task<User?> GetUserDetails(int userId);
        Task<Attendance?> CheckAttendence(int? id);

        Task<User> Login(Login user);
        Task<List<User>?> GetUserDetailList();
    }
}