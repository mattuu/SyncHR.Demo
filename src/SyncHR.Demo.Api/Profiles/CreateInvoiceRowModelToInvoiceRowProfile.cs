using AutoMapper;
using SyncHR.Demo.DataAccess.Models;
using SyncHR.Demo.API.Models;

namespace SyncHR.Demo.Api.Profiles
{
    public class CreateInvoiceRowModelToInvoiceRowProfile : Profile
    {
        public CreateInvoiceRowModelToInvoiceRowProfile()
        {
            CreateMap<CreateInvoiceRowModel, InvoiceRow>();
        }
    }
}