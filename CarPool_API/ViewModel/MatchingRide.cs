
namespace ViewModel
{
    public class MatchingRide
    {
        public int RideId { get; set; }
        public string? RideUserName { get; set; }
        public string? FromLocation { get; set; }
        public string? ToLocation { get; set; }
        public string? Date { get; set; }
        public string? RideTime { get; set; }
        public int Price { get; set; }
        public string? AvailableSeats { get; set; }
    }
}
