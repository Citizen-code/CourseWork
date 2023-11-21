using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace AutoserviceWPF.Models.ModelsDB
{
    public partial class ServicePrice
    {
        public Guid Id { get; set; }

        public decimal Price { get; set; }

        [JsonProperty("Is_Time_Based")]
        public bool? IsTimeBased { get; set; }

        //public virtual ICollection<ListService> ListServices { get; set; } = new List<ListService>();

        //public virtual ICollection<Service> Services { get; set; } = new List<Service>();
    }
}