using System;
using System.Collections.Generic;

namespace SyncHR.Demo.DataAccess.Models
{
    public partial class Invoice
    {
        public Invoice()
        {
            Rows = new HashSet<InvoiceRow>();
        }

        public int InvoiceId { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public int Number { get; set; }
        public DateTime SellDate { get; set; }
        public DateTime IssueDate { get; set; }
        public int PayTime { get; set; }
        public bool IsPaid { get; set; }
        public decimal GrossAmount { get; set; }
        public decimal NetAmount { get; set; }
        public int ClientId { get; set; }
        public int PaymentTypeId { get; set; }

        public virtual Client Client { get; set; }
        public virtual PaymentType PaymentType { get; set; }
        public virtual ICollection<InvoiceRow> Rows { get; set; }
    }
}
