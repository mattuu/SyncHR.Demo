namespace SyncHR.Demo.API.Models
{
    public class InvoiceRowModel
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public decimal Quantity { get; set; }
        public string Unit { get; set; }
        public decimal UnitPrice { get; set; }
    }
}