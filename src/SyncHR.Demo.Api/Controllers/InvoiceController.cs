using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SyncHR.Demo.API.Models;
using SyncHR.Demo.DataAccess;
using SyncHR.Demo.DataAccess.Models;

namespace SyncHR.Demo.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InvoiceController : ControllerBase
    {
        private readonly ILogger _logger;
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
                            .Include(i => i.Client)
                            .Include(i => i.PaymentType)
                            .SingleOrDefault(i => i.InvoiceId == id);

            var model = _mapper.Map<InvoiceDetailsModel>(query);

            return Ok(model);
        }

        [HttpGet("{id}/rows")]
        public IActionResult GetRows(int id)
        {
            var query = _context.InvoiceRows
                .Where(ir => ir.InvoiceId == id);

            return Ok(_mapper.Map<IEnumerable<InvoiceRowModel>>(query));
        }

        [HttpPost()]
        public IActionResult Post([FromBody] CreateOrUpdateInvoiceModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var invoice = _mapper.Map<Invoice>(model);

            _context.Invoices.Add(invoice);
            _context.SaveChanges();

            return Ok(invoice.InvoiceId);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] CreateOrUpdateInvoiceModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var query = _context.Invoices.Find(id);

            if (query == null)
            {
                return NotFound();
            }

            query.Year = model.Year;
            query.Month = model.Month;
            query.Number = model.Number;
            query.IssueDate = model.IssueDate;
            query.SellDate = model.SellDate;
            query.IsPaid = model.IsPaid;
            query.PayTime = model.PayTime;
            query.PaymentTypeId = model.PaymentTypeId;
            query.ClientId = model.ClientId;
            query.GrossAmount = model.GrossAmount;
            query.NetAmount = model.NetAmount;

            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var invoice = _context.Invoices.Find(id);

            if (invoice == null)
            {
                return NotFound();
            }

            _context.Invoices.Remove(invoice);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
