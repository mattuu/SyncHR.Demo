using System;
using System.Collections.Generic;

namespace SyncHR.Demo.API.Models
{
    public class InvoiceDetailsModel
    {
        public int Year { get; set; }

        public int Month { get; set; }

        public int Number { get; set; }

        public ClientModel Client { get; set; }

        public DateTime SellDate { get; set; }

        public DateTime IssueDate { get; set; }

        public int PayTime { get; set; }

        public bool IsPaid { get; set; }

        public PaymentTypeModel PaymentType { get; set; }

        public decimal GrossAmount { get; set; }

        public decimal NetAmount { get; set; }
    }
}