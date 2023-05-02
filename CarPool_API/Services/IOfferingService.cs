using ViewModel;

namespace Services
{
    public interface IOfferingService
    {
        public OfferedRide OfferRide(OfferedRide ride);

        public List<MatchingRide> GetOfferedRides();
    }
}