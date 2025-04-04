﻿using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace IMS.Model
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public string UserId { get; set; } 
        public string? EmployeeUniqueId { get; set; }
        public override string UserName { get; set; } = string.Empty;
        public override string Email { get; set; } = string.Empty;
        public override string PhoneNumber { get; set; } = string.Empty;
        public string DepartmentName { get; set; } = string.Empty;
        public string Designation { get; set; } = string.Empty;
        public string? barcode { get; set; }
        public string? password { get; set; } 

        public string Roles { get; set; }
        public ICollection<Attendance>? Attendances { get; set; }
    }
}
