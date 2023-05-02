using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class BookingDetails
    {
        [Key]
        public int BookId { get; set; }
        [ForeignKey("Ride")]
        public int RideId { get; set; }
        public int OfferedUserId { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public string? FromLocation { get; set; }
        public string? ToLocation { get; set; } 
        public string? Date { get; set; }
        public string? RideTime { get; set; }
        public int Price { get; set; }
    }
}