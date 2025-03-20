using IMS.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IMS.Model.Data
{
    public class AuthenticationDBContext :  IdentityDbContext<ApplicationUser,ApplicationRoles,string>
    {
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<ApplicationRoles> ApplicationRoles { get; set; }
        public AuthenticationDBContext(DbContextOptions<AuthenticationDBContext> options)
            : base(options)
        { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<IdentityUserLogin<string>>().HasKey(x => new { x.LoginProvider, x.ProviderKey });
            modelBuilder.Entity<IdentityUserRole<string>>().HasKey(x => new { x.UserId, x.RoleId });
            modelBuilder.Entity<IdentityUserToken<string>>().HasKey(x => new { x.UserId, x.LoginProvider, x.Name });

            modelBuilder.Entity<Attendance>()
           .HasIndex(c => c.UserId) // Ensure UniqueCode is indexed
           .IsUnique();

            modelBuilder.Entity<ApplicationUser>()
                            .HasMany(u => u.Attendances)
                            .WithOne(a => a.User)
                            .HasForeignKey(a => a.UserId)
                            .HasPrincipalKey(c => c.UserId)
                            .IsRequired(false)
                            .OnDelete(DeleteBehavior.Cascade);
           
        }
    }
}
