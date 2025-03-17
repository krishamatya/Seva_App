using System.ComponentModel.DataAnnotations;

namespace IMS.Model
{
    public class Attendance
    {
        [Key]
        public int AttendanceId { get; set; }
        public string? UserId { get; set; }
        public ApplicationUser User { get; set; }
        public DateTime? CheckInDate { get; set; }
        public DateTime? CheckOutTime { get; set; }

    }
}
