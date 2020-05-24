using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using AutoMapper;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using RazorEngine;
using RazorEngine.Configuration;
using RazorEngine.Templating;
using SyncHR.Demo.DataAccess;
using SyncHR.Demo.DataAccess.Models;

namespace SyncHR.Demo.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InvoiceExportController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly SyncHRDemoContext _context;
        private readonly IMapper _mapper;

        public InvoiceExportController(ILogger<InvoiceExportController> logger, SyncHRDemoContext context, IMapper mapper)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet("{id}/pdf")]
        public IActionResult GetPdf(int id)
        {
            var query = _context.Invoices.Include(i => i.Rows)
                                       .Include(i => i.Client)
                                       .Include(i => i.PaymentType)
                                       .SingleOrDefault(i => i.InvoiceId == id);

            var exporter = new InvoicePdfExporter();
            var content = exporter.Export(query);
        
            var pdfDoc = new Document(PageSize.A4);
            var fileName = $"{Guid.NewGuid()}.pdf";
            var pdfFilePath = Path.Combine(Path.GetTempPath(), fileName);

            using (var fileStream = new FileStream(pdfFilePath, FileMode.Create))
            {
                PdfWriter.GetInstance(pdfDoc, fileStream);

                pdfDoc.Open();

                var chunk = new Paragraph(content);
                pdfDoc.Add(chunk);

                pdfDoc.Close();
                fileStream.Dispose();
            }

            var provider = new PhysicalFileProvider(Path.GetTempPath());
            IFileInfo fileInfo = provider.GetFileInfo(fileName);
            var readStream = fileInfo.CreateReadStream();
            return File(readStream, "application/octet-stream");
        }
    }
}
