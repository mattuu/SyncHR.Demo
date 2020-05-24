using System.Collections;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SyncHR.Demo.API.Models;
using SyncHR.Demo.DataAccess;
using SyncHR.Demo.DataAccess.Models;

namespace SyncHR.Demo.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InvoiceRowController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly SyncHRDemoContext _context;
        private readonly IMapper _mapper;

        public InvoiceRowController(ILogger<InvoiceRowController> logger, SyncHRDemoContext context, IMapper mapper)
        {
            _logger = logger ?? throw new System.ArgumentNullException(nameof(logger));
            _context = context ?? throw new System.ArgumentNullException(nameof(context));
            _mapper = mapper ?? throw new System.ArgumentNullException(nameof(mapper));
        }

        [HttpPost("{id}")]
        public IActionResult Post(int id, CreateInvoiceRowModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var invoice = _context.Invoices.Find(id);

            if (invoice == null)
            {
                return Conflict();
            }

            var invoiceRow = _mapper.Map<InvoiceRow>(model);
            invoice.Rows.Add(invoiceRow);

            _context.SaveChanges();

            return Created("", invoiceRow.InvoiceRowId);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, UpdateInvoiceRowModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var invoiceRow = _context.InvoiceRows.Find(id);

            if (invoiceRow == null)
            {
                return Conflict();
            }

            invoiceRow.ProductName = model.ProductName;
            invoiceRow.Quantity = model.Quantity;
            invoiceRow.Unit = model.Unit;
            invoiceRow.UnitPrice = model.UnitPrice;

            _context.SaveChanges();

            return Ok(invoiceRow.InvoiceRowId);
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var invoiceRow = _context.InvoiceRows.Find(id);
            _context.InvoiceRows.Remove(invoiceRow);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
