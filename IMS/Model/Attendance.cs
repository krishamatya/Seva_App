using System.ComponentModel.DataAnnotations;

namespace IMS.Model
{
    public class Attendance
    {
        [Key]
        public int Id { get; set; }
        public int? UId { get; set; }
        public User User { get; set; }
        public DateTime? CheckInDate { get; set; }
        public DateTime? CheckOutTime { get; set; }

    }
}
