using SyncHR.Demo.DataAccess.Models;
using RazorEngine;
using RazorEngine.Configuration;
using RazorEngine.Templating;

namespace SyncHR.Demo.Api
{
    public class InvoicePdfExporter
    {
        public InvoicePdfExporter()
        {
            var configuration = new TemplateServiceConfiguration
            {
                TemplateManager = new EmbeddedResourceTemplateManager(typeof(InvoicePdfExporter))
            };
            Engine.Razor = RazorEngineService.Create(configuration);
        }

        public string Export(Invoice invoice)
        {
            return Engine.Razor.RunCompile("Templates.InvoiceExport", typeof(Invoice), invoice);
        }
    }
}