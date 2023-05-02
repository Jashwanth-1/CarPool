using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ViewModel;
using Services;

namespace CarPool.Controllers
{
    [Authorize]
    [ApiController]
    [Route("Api/Ride")]
    public class RideController : Controller
    {
        private IBookingService _bookingService;
        private IOfferingService _offeringService;
        public RideController(IBookingService bookingService, IOfferingService offeringService)
        {
            this._bookingService = bookingService;
            this._offeringService = offeringService;
        }
        [HttpPost]
        [Route("Offer")]
        public IActionResult OfferRide(OfferedRide ride)
        {
            ResponseBase<OfferedRide> response = new ResponseBase<OfferedRide>();
            try
            {
                response.Success = "true";
                response.Data = _offeringService.OfferRide(ride);
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Success = "false";
                response.ErrorMessage = ex.Message;
                return BadRequest(response);
            }
            
        }

        [HttpPost]
        [Route("Matching")]
        public IActionResult GetMatchingRides(BookRequest ride)
        {
            List<MatchingRide> rides = _bookingService.GetMatchingRides(ride);
            ResponseBase<List<MatchingRide>> response = new ResponseBase<List<MatchingRide>>();
            try
            {
                if (rides != null)
                {
                    response.Success = "true";
                    response.Data = rides;
                    return Ok(response);
                }
                response.Success = "true";
                response.ErrorMessage = "No Matching Rides";
                return NotFound(response);
            }
            catch (Exception ex)
            {
                response.Success = "false";
                response.ErrorMessage = ex.Message;
                return BadRequest(response);
            }
            
        }

        [HttpPost]
        [Route("Book")]
        public IActionResult BookRide(BookRequest ride)
        {
            BookRequest book= _bookingService.BookRide(ride);
            ResponseBase<BookRequest> response = new ResponseBase<BookRequest>();
            try
            {
                if (book != null)
                {
                    response.Success = "true";
                    response.Data = book;
                    return Ok(response);
                }
                response.Success = "true";
                response.ErrorMessage = "Ride does not exist";
                return NotFound(response);
            }
            catch(Exception ex)
            {
                response.Success = "false";
                response.ErrorMessage = ex.Message;
                return BadRequest(response);

            }

        }

        [HttpGet]
        [Route("Booked")]
        public IActionResult GetBookedRides()
        {
            List<MatchingRide> ride = _bookingService.GetBookedRides();
            ResponseBase<List<MatchingRide>> response = new ResponseBase<List<MatchingRide>>();
            try
            {
                if (ride != null)
                {
                    response.Success = "true";
                    response.Data = ride;
                    return Ok(response);
                    
                }
                response.Success = "true";
                response.ErrorMessage = "No Booked Rides";
                return NotFound(response);
            }
            catch(Exception ex)
            {
                response.Success = "false";
                response.ErrorMessage = ex.Message;
                return BadRequest(response);
            }
            
        }

        [HttpGet]
        [Route("Offered")]
        public IActionResult GetOfferedRides()
        {
            List<MatchingRide> ride = _offeringService.GetOfferedRides();
            ResponseBase<List<MatchingRide>> response = new ResponseBase<List<MatchingRide>>();
            try
            {
                if (ride != null && ride.Count>0)
                {
                    response.Success = "true";
                    response.Data = ride;
                    return Ok(response);
                    
                }
                response.Success = "true";
                response.ErrorMessage = "No Offered Rides";
                return NotFound(response);
            }
            catch (Exception ex)
            {
                response.Success = "false";
                response.ErrorMessage = ex.Message;
                return BadRequest(response);
            }
            
        }
    }
}
