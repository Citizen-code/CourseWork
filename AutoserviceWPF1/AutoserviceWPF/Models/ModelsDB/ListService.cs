using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AutoserviceWPF.Models.ModelsDB
{
    public partial class ListService
    {
        public Guid Id { get; set; }

        [JsonPropertyName("order_id")]
        public Guid OrderId { get; set; }

        [JsonPropertyName("service_id")]
        public Guid ServiceId { get; set; }

        [JsonPropertyName("price_id")]
        public Guid PriceId { get; set; }

        public decimal? Time { get; set; }

        public virtual Order Order { get; set; }

        public virtual ServicePrice Price { get; set; }

        public virtual Service Service { get; set; }
    }
}