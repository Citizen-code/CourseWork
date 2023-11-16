using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AutoserviceWPF.Models.ModelsDB
{
    public partial class Service
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        [JsonPropertyName("Date_Add")]
        public DateTime? DateAdd { get; set; }

        [JsonPropertyName("Price_Id")]
        public Guid PriceId { get; set; }

        [JsonPropertyName("Is_Active")]
        public bool? IsActive { get; set; }

        //public virtual ICollection<ListService> ListServices { get; set; } = new List<ListService>();

        public virtual ServicePrice Price { get; set; }
    }
}