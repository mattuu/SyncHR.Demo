using System;
using System.Collections.Generic;

namespace SyncHR.Demo.DataAccess.Models
{
    public partial class Client
    {
        public Client()
        {
            Invoice = new HashSet<Invoice>();
        }

        public int ClientId { get; set; }
        public string Name { get; set; }
        public string TaxCode { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }

        public virtual ICollection<Invoice> Invoice { get; set; }
    }
}
