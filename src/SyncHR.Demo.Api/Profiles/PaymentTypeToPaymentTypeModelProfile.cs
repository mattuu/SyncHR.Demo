using AutoMapper;
using SyncHR.Demo.DataAccess.Models;
using SyncHR.Demo.API.Models;

namespace SyncHR.Demo.Api.Profiles
{
    public class PaymentTypeToPaymentTypeModelProfile : Profile
    {
        public PaymentTypeToPaymentTypeModelProfile()
        {
            CreateMap<PaymentType, PaymentTypeModel>()
                .ForMember(m => m.Id, cfg => cfg.MapFrom(i => i.PaymentTypeId));
        }
    }
}