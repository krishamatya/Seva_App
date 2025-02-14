namespace IMS.Model
{
    public static class ConvertToDTO
    {
        public static UserDTO ConvertUser(User user)
        {
            var userDTO = new UserDTO
            {
                Attendances = user.Attendances!=null ? user.Attendances.Select(a => new AttendanceDTO
                {
                    Id = a.Id,
                    CheckInDate = a.CheckInDate,
                    CheckOutTime = a.CheckOutTime
                }).ToList() : null,
                barcode = user.barcode,
                Id = user.Id,
                EmployeeUniqueId = user.EmployeeUniqueId,
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                DepartmentName = user.DepartmentName,
                Designation = user.Designation
            };

            return userDTO;
        }
    }
}
