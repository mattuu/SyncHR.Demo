using AutoMapper;
using SyncHR.Demo.DataAccess.Models;

namespace SyncHR.Demo.Api.Profiles
{
    public class ClientToClientModelProfile : Profile
    {
        public ClientToClientModelProfile()
        {
            CreateMap<Client, ClientModel>()
                .ForMember(m => m.Id, cfg => cfg.MapFrom(c => c.ClientId));
        }
    }
}