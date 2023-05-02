using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class CarpoolDBContext : DbContext
    {

        public CarpoolDBContext(DbContextOptions<CarpoolDBContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<RideDetails> RideDetails { get; set; }
        public DbSet<BookingDetails> BookedRides { get; set;}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BookingDetails>()
                .Property(a => a.BookId).ValueGeneratedOnAdd();
            modelBuilder.Entity<User>()
                .Property(u => u.UserId).ValueGeneratedOnAdd();
            modelBuilder.Entity<RideDetails>()
                .Property(r => r.Id).ValueGeneratedOnAdd();
        }
    }   
}

