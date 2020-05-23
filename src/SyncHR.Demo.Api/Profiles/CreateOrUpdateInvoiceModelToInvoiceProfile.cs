using AutoMapper;
using SyncHR.Demo.API.Models;
using SyncHR.Demo.DataAccess.Models;

namespace SyncHR.Demo.Api.Profiles
{
    public class CreateOrUpdateInvoiceModelToInvoiceProfile : Profile
    {
        public CreateOrUpdateInvoiceModelToInvoiceProfile()
        {
            CreateMap<CreateOrUpdateInvoiceModel, Invoice>();
        }
    }
}