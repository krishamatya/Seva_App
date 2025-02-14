using IMS.Model;
using Microsoft.EntityFrameworkCore;

namespace IMS.Model.Data
{
    public class AuthenticationDBContext : DbContext
    {
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<User> Users { get; set; }

        public AuthenticationDBContext(DbContextOptions<AuthenticationDBContext> options)
            : base(options)
        { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>()
                            .HasMany(u => u.Attendances)
                            .WithOne(a => a.User)
                            .HasForeignKey(a => a.UId)
                            .IsRequired(false)
                            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
