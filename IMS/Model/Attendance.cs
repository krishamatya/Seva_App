using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.Model
{
    public class Attendance
    {
        [Key]
        public int AttendanceId { get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; } = null!;
        public ApplicationUser User { get; set; }
        public DateTime? CheckInDate { get; set; }
        public DateTime? CheckOutTime { get; set; }

    }
}
