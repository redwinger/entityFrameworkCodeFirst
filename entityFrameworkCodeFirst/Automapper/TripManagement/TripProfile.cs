using AutoMapper;
using EntityFrameworkCodeFirst.DtoModels.TripManagement;
using Sta.Domain.TripManagement;

namespace EntityFrameworkCodeFirst.Automapper.TripManagement
{
    public class TripProfile:Profile
    {
        public TripProfile()
        {
            CreateMap<Trip, TripDto>(MemberList.Source);
            CreateMap<TripDto, Trip>(MemberList.Source);
        }
    }
}
