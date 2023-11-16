using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AutoserviceWPF.Models.ModelsDB
{
    public partial class ListConsumablePart
    {
        public Guid Id { get; set; }

        [JsonPropertyName("order_id")]
        public Guid OrderId { get; set; }

        [JsonPropertyName("consumable_part_id")]
        public Guid ConsumablePartId { get; set; }

        [JsonPropertyName("Consumable_Part")]
        public virtual ConsumablePart ConsumablePart { get; set; }

        public virtual Order Order { get; set; }
    }
}