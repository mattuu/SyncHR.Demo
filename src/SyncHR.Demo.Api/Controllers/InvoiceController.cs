using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SyncHR.Demo.API.Models;
using SyncHR.Demo.DataAccess;

namespace SyncHR.Demo.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InvoiceController : ControllerBase
    {
        private readonly ILogger<InvoiceController> _logger;
        private readonly SyncHRDemoContext _context;
        private readonly IMapper _mapper;

        public InvoiceController(ILogger<InvoiceController> logger, SyncHRDemoContext context, IMapper mapper)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet]
        public IActionResult Get()
        {
            var query = _context.Invoices
                            .Include(i => i.Client)
                            .Include(i => i.PaymentType);

            var models = _mapper.Map<IEnumerable<InvoiceModel>>(query);

            return Ok(models);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var query = _context.Invoices.Include(i => i.Rows)
                            .SingleOrDefault(i => i.InvoiceId == id);

            var model = _mapper.Map<InvoiceDetailsModel>(query);

            return Ok(model);
        }
    }
}
