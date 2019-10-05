using AutoMapper;
using Sta.Domain.TripManagement;
using EntityFrameworkCodeFirst.DtoModels.TripManagement;


namespace EntityFrameworkCodeFirst.Automapper.TripManagement
{
    public class TripItemProfile : Profile
    {
        public TripItemProfile()
        {
            CreateMap<TripItem, TripItemDto>(MemberList.Source);
            CreateMap<TripItemDto, TripItem>(MemberList.Source);
        }
    }
}
