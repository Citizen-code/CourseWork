using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace AutoserviceWPF.Models.ModelsDB
{
    public partial class ListConsumablePart
    {
        public Guid Id { get; set; }

        [JsonProperty("order_id")]
        public Guid OrderId { get; set; }

        [JsonProperty("consumable_part_id")]
        public Guid ConsumablePartId { get; set; }

        [JsonProperty("Consumable_Part")]
        public virtual ConsumablePart ConsumablePart { get; set; }

        public virtual Order Order { get; set; }
    }
}