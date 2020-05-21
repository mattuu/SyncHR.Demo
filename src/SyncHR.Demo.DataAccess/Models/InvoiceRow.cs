using System;
using System.Collections.Generic;

namespace SyncHR.Demo.DataAccess.Models
{
    public partial class InvoiceRow
    {
        public int InvoiceRowId { get; set; }
        public string ProductName { get; set; }
        public decimal Quantity { get; set; }
        public string Unit { get; set; }
        public decimal UnitPrice { get; set; }
        public int InvoiceId { get; set; }

        public virtual Invoice Invoice { get; set; }
    }
}
