using AutoMapper;
using Models;
using ViewModel;

namespace Services
{
    public class OfferingService : IOfferingService
    {
        private CarpoolDBContext _carContext;
        private IMapper _mapper;
        public OfferingService(CarpoolDBContext context, IUserService user, IMapper mapper)
        {
            this._carContext = context;
            this._mapper = mapper;
        }
        public OfferedRide OfferRide(OfferedRide offeredRide)
        {
            RideDetails newRide = _mapper.Map<RideDetails>(offeredRide);
            
            if (offeredRide.Stops == "")
            {
                newRide.AvailableSeats += $",{offeredRide.AvailableSeats}";
            }
            else
            {
                int numberOfStops = offeredRide.Stops!.Split(",").Count()+1;
                for (int i = 0; i < numberOfStops; i++)
                {   
                    newRide.AvailableSeats += $",{offeredRide.AvailableSeats}";
                }
            }
            newRide.OfferedUserId = UserService.UserId;
            _carContext.Add(newRide);
            _carContext.SaveChanges();
            return offeredRide;
        }


        public List<MatchingRide> GetOfferedRides()
        {
            List<BookingDetails> offeredRides = _carContext.BookedRides.Where(r => r.OfferedUserId == UserService.UserId).ToList();
            List<MatchingRide> offeredRidesView = new List<MatchingRide>();
            try
            {
                foreach (BookingDetails ride in offeredRides)
                {
                    BookRequest offered = _mapper.Map<BookRequest>(ride);
                    MatchingRide newRide = _mapper.Map<MatchingRide>(offered);
                    User user = _carContext.Users.Where(u => u.UserId == ride.UserId).FirstOrDefault()!;
                    if(user != null)
                    {
                        newRide.RideUserName = user.FirstName + " " + user.LastName;
                        offeredRidesView.Add(newRide);
                    }
                }
                return offeredRidesView;
            }
            catch
            {

                return offeredRidesView;
            }
            
        }
    }
}
