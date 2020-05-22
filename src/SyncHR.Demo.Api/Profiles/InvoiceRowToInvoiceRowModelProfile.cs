using AutoMapper;
using SyncHR.Demo.DataAccess.Models;
using SyncHR.Demo.API.Models;

namespace SyncHR.Demo.Api.Profiles
{
    public class InvoiceRowToInvoiceRowModelProfile : Profile
    {
        public InvoiceRowToInvoiceRowModelProfile()
        {
            CreateMap<InvoiceRow, InvoiceRowModel>()
                .ForMember(m => m.Id, cfg => cfg.MapFrom(ir => ir.InvoiceId));
        }
    }
}