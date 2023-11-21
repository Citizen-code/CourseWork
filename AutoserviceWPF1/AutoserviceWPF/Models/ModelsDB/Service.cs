using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace AutoserviceWPF.Models.ModelsDB
{
    public partial class Service
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        [JsonProperty("Date_Add")]
        public DateTime? DateAdd { get; set; }

        [JsonProperty("Price_Id")]
        public Guid PriceId { get; set; }

        [JsonProperty("Is_Active")]
        public bool? IsActive { get; set; }

        //public virtual ICollection<ListService> ListServices { get; set; } = new List<ListService>();

        public virtual ServicePrice Price { get; set; }
    }
}