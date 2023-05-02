using ViewModel;

namespace Services
{
    public interface IBookingService
    {   
        public List<MatchingRide> GetMatchingRides(BookRequest ride);
        public BookRequest BookRide(BookRequest ride);

        public List<MatchingRide> GetBookedRides();
    }
}