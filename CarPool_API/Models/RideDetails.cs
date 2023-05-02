using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class RideDetails
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("User")]
        public int OfferedUserId { get; set; }
        public string? FromLocation { get; set; }
        public string? ToLocation { get; set; }
        public string? Date { get; set; }
        public string? RideTime { get; set; }
        public int Price { get; set; }
        public string? Stops { get; set; }
        public string? AvailableSeats { get; set; }
    }
}
