using System.ComponentModel.DataAnnotations;

namespace SyncHR.Demo.API.Models
{
    public class UpdateInvoiceRowModel
    {
        [Required]
        public string ProductName { get; set; }

        [Required]
        public decimal Quantity { get; set; }

        [Required]
        public string Unit { get; set; }

        [Required]
        public decimal UnitPrice { get; set; }
    }
}