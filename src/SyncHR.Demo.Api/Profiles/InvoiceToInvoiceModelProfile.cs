using AutoMapper;
using SyncHR.Demo.DataAccess.Models;
using SyncHR.Demo.API.Models;

namespace SyncHR.Demo.Api.Profiles
{
    public class InvoiceToInvoiceModelProfile : Profile
    {
        public InvoiceToInvoiceModelProfile()
        {
            CreateMap<Invoice, InvoiceModel>()
                .ForMember(m => m.Id, cfg => cfg.MapFrom(i => i.InvoiceId))
                .ForMember(m => m.ClientName, cfg => cfg.MapFrom(i => i.Client.Name))
                .ForMember(m => m.PaymentTypeName, cfg => cfg.MapFrom(i => i.PaymentType.Name));
        }
    }
}