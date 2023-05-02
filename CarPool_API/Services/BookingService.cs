using AutoMapper;
using Models;
using ViewModel;

namespace Services
{
    public class BookingService : IBookingService
    {
        private CarpoolDBContext _carContext;
        private IMapper _mapper;
        public BookingService(CarpoolDBContext context, IMapper mapper)
        {
            this._carContext = context;
            this._mapper = mapper;
        }

        private List<string> GetStops(string fromLocation,string stops,string toLocation)
        {
            List<string> locations = new List<string>();
            locations.Add($"{fromLocation}");
            if(stops!= "")
            {
                locations.AddRange(stops.Split(',').ToList());
            }
            locations.Add($"{toLocation}");
            return locations;
        }

        private List<int> GetSeats(string availableSeats)
        {
            List<string> available = availableSeats.Split(',').ToList();
            List<int> seats = available.Select(a => int.Parse(a)).ToList();
            return seats;
        }
        public List<MatchingRide> GetMatchingRides(BookRequest ride)
        {

            try
            {
                List<RideDetails> rides = _carContext.RideDetails.Where(r => r.RideTime == ride.RideTime && r.Date == ride.Date).ToList();
                List<MatchingRide> availableRides = new List<MatchingRide>();
                foreach (RideDetails available in rides)
                {
                    List<string> locations = GetStops(available.FromLocation!, available.Stops!, available.ToLocation!);
                    List<int> seats = GetSeats(available.AvailableSeats!);
                    int minimumSeats = int.MaxValue;
                    if (locations.Contains(ride.FromLocation!) && locations.Contains(ride.ToLocation!) && (ride.OfferedUserId != UserService.UserId))
                    {
                        int numberOfLocations = Math.Abs(locations.IndexOf(ride.ToLocation!) - locations.IndexOf(ride.FromLocation!));
                        int priceOfEachStop = (available.Price / locations.Count());

                        available.FromLocation = ride.FromLocation;
                        available.ToLocation = ride.ToLocation;
                        available.Price = priceOfEachStop * numberOfLocations;

                        for (int i = locations.IndexOf(ride.FromLocation!); i <= locations.IndexOf(ride.ToLocation!); i++)
                        {
                            if (seats[i] < minimumSeats)
                            {
                                minimumSeats = seats[i];
                                available.AvailableSeats = Convert.ToString(minimumSeats);
                            }
                        }
                    }
                    if (minimumSeats != int.MaxValue && minimumSeats > 0)
                    {
                        BookRequest newMatch = _mapper.Map<BookRequest>(available);
                        MatchingRide newMatching = _mapper.Map<MatchingRide>(newMatch);
                        int id = available.OfferedUserId;
                        User user = _carContext.Users.Where(r => r.UserId == id).FirstOrDefault()!;
                        if(user != null)
                        {
                            newMatching.RideUserName = user.FirstName + " " + user.LastName;
                            newMatching.AvailableSeats = available.AvailableSeats;
                            availableRides.Add(newMatching);
                        }
                    }
                }
                return availableRides;
            }

            catch (Exception e) 
            {
                throw new Exception(e.Message);
            }
        }

        private bool Book(BookingDetails ride)
        {
            RideDetails offered = new RideDetails();
            try
            {
                offered = _carContext.RideDetails.Where(r => r.Id == ride.RideId).First();
                if (offered == null)
                {
                    return false;
                }
                List<string> locations = GetStops(offered.FromLocation!, offered.Stops!, offered.ToLocation!);
                List<int> availableSeats = GetSeats(offered.AvailableSeats!);
                offered.AvailableSeats = "";
                if (locations.Count() > 0)
                {
                    for (int i = 0; i < availableSeats.Count(); i++)
                    {
                        if (i >= locations.IndexOf(ride.FromLocation!) && i < locations.IndexOf(ride.ToLocation!))
                        {
                            availableSeats[i] = availableSeats[i] - 1;
                        }
                        offered.AvailableSeats = offered.AvailableSeats + Convert.ToString(availableSeats[i]) + ",";
                    }
                    int index = offered.AvailableSeats.LastIndexOf(",");
                    offered.AvailableSeats = offered.AvailableSeats.Remove(index);
                }
                _carContext.Update(offered);
                _carContext.SaveChanges();
                return true;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public BookRequest BookRide(BookRequest ride)
        {
            BookingDetails newBooking = _mapper.Map<BookingDetails>(ride);
            newBooking.UserId = UserService.UserId;
            RideDetails tempRide = _carContext.RideDetails.Where(r => r.Id== ride.RideId).First();
            newBooking.OfferedUserId = tempRide.OfferedUserId;

            if (!Book(newBooking))
            {
                return null;
            };
            
            _carContext.Add(newBooking);
            _carContext.SaveChanges();

            return (ride);
        }

        public List<MatchingRide> GetBookedRides()
        {
            List<BookingDetails> bookedRides = _carContext.BookedRides.Where(b => b.UserId == UserService.UserId).ToList();
            List<MatchingRide> bookedRidesView = new List<MatchingRide>();
            foreach(BookingDetails ride in bookedRides)
            {
                BookRequest booked = _mapper.Map<BookRequest>(ride);
                MatchingRide newRide = _mapper.Map<MatchingRide>(booked);
                User user = _carContext.Users.Where(u => u.UserId == ride.OfferedUserId).First();
                newRide.RideUserName = user.FirstName +  " " + user.LastName;
                bookedRidesView.Add(newRide);
            }
            return bookedRidesView;
        }
    }
}
