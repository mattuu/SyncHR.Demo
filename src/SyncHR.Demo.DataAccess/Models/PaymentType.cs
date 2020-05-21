using System;
using System.Collections.Generic;

namespace SyncHR.Demo.DataAccess.Models
{
    public partial class PaymentType
    {
        public PaymentType()
        {
            Invoice = new HashSet<Invoice>();
        }

        public int PaymentTypeId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Invoice> Invoice { get; set; }
    }
}
