using System;
using System.ComponentModel.DataAnnotations;

namespace SyncHR.Demo.API.Models
{
    public class CreateOrUpdateInvoiceModel
    {
        [Required]
        public int Year { get; set; }

        [Required]
        public int Month { get; set; }

        [Required]
        public int Number { get; set; }

        [Required]
        public int ClientId { get; set; }

        [Required]
        public DateTime SellDate { get; set; }

        [Required]
        public DateTime IssueDate { get; set; }

        [Required]
        public int PayTime { get; set; }

        [Required]
        public bool IsPaid { get; set; }

        [Required]
        public int PaymentTypeId { get; set; }

        [Required]
        public decimal GrossAmount { get; set; }

        [Required]
        public decimal NetAmount { get; set; }
    }
}