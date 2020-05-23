using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SyncHR.Demo.API.Models;
using SyncHR.Demo.DataAccess;

namespace SyncHR.Demo.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentTypeController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly SyncHRDemoContext _context;
        private readonly IMapper _mapper;

        public PaymentTypeController(ILogger<InvoiceController> logger, SyncHRDemoContext context, IMapper mapper)
        {
            this._logger = logger ?? throw new System.ArgumentNullException(nameof(logger));
            this._context = context ?? throw new System.ArgumentNullException(nameof(context));
            this._mapper = mapper ?? throw new System.ArgumentNullException(nameof(mapper));
        }

        [HttpGet]
        public IActionResult Get(){
            return Ok(_mapper.Map<IEnumerable<PaymentTypeModel>>(_context.PaymentTypes));
        }
    }
}
