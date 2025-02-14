

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace IMS.Model
{
    public class User
    {
        [Key]
        public int? Id { get; set; }
        public string? EmployeeUniqueId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string DepartmentName { get; set; }
        public string Designation { get; set; }
        public string? barcode { get; set; }
       
        public ICollection<Attendance>? Attendances { get; set; }

    }
}
