namespace IMS.Model
{
    public static class ConvertToDTO
    {
        public static UserDTO ConvertUser(ApplicationUser user)
        {
            var userDTO = new UserDTO
            {
                Attendances = user.Attendances != null ? user.Attendances.Select(a => new AttendanceDTO
                {
                    Id = a.AttendanceId,
                    CheckInDate = a.CheckInDate,
                    CheckOutTime = a.CheckOutTime
                }).ToList() : null,
                barcode = user.barcode,
                userId = user.UserId,
                EmployeeUniqueId = user.EmployeeUniqueId,
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                DepartmentName = user.DepartmentName,
                Designation = user.Designation
            };

            return userDTO;
        }
        public static List<UserDTO> ConvertUserList(List<ApplicationUser> u)
        {
            List<UserDTO> userDTO = new List<UserDTO>();
            u.ForEach(x =>
            {

                UserDTO user = new UserDTO()
                {
                    Attendances = x.Attendances != null ? x.Attendances.Select(a => new AttendanceDTO
                    {
                        Id = a.AttendanceId,
                        CheckInDate = a.CheckInDate,
                        CheckOutTime = a.CheckOutTime
                    }).ToList() : null,
                    barcode = x.barcode,
                    userId = x.UserId,
                    EmployeeUniqueId = x.EmployeeUniqueId,
                    UserName = x.UserName,
                    Email = x.Email,
                    PhoneNumber = x.PhoneNumber,
                    DepartmentName = x.DepartmentName,
                    Designation = x.Designation


                };
                userDTO.Add(user);



            });
            return userDTO;
        }

    }
}
            
