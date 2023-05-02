namespace ViewModel
{
    public class BookRequest
    {
        public int RideId { get; set; }
        public int OfferedUserId { get; set; }
        public string? FromLocation { get; set; }
        public string? ToLocation { get; set; }
        public string? Date { get; set; }
        public string? RideTime { get; set; }
        public int Price { get; set; }
    }
}
