using AutoMapper;
using SyncHR.Demo.DataAccess.Models;
using SyncHR.Demo.API.Models;

namespace SyncHR.Demo.Api.Profiles
{
    public class InvoiceToInvoiceDetailsModelProfile : Profile
    {
        public InvoiceToInvoiceDetailsModelProfile()
        {
            CreateMap<Invoice, InvoiceDetailsModel>();
        }
    }
}