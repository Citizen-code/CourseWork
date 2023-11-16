using System;
using System.Collections.Generic;

namespace AutoserviceWPF.Models.ModelsDB
{
    public partial class StatusOrder
    {
        public int Id { get; set; }

        public string Name { get; set; }

        //public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}