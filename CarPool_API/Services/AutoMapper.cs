using AutoMapper;
using Models;
using ViewModel;

namespace Services
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() {
            CreateMap<UserView, User>().ReverseMap();
            CreateMap<BookRequest, BookingDetails>().ReverseMap();
            CreateMap<OfferedRide, RideDetails>().ReverseMap();
            CreateMap<BookRequest, RideDetails>().ForMember(dest => dest.Id , act => act.MapFrom(src=> src.RideId)).ReverseMap();
            CreateMap<BookRequest, MatchingRide>().ReverseMap();
        }
    }
}
