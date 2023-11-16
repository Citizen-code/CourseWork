using AutoserviceWPF.Models.ModelsResponse;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AutoserviceWPF.Models.ModelsDB
{
    public partial class ConsumablePart
    {
        public Guid Id { get; set; }

        public string Brand { get; set; }

        public string Article { get; set; }

        public string Name { get; set; }

        public decimal Price { get; set; }

        [JsonPropertyName("Measure_Unit")]
        public string MeasureUnit { get; set; }

        [JsonPropertyName("photo_id")]
        public Guid? PhotoId { get; set; }

        [JsonPropertyName("Date_Add")]
        public DateTime DateAdd { get; set; }

        //public virtual ICollection<ListConsumablePart> ListConsumableParts { get; set; } = new List<ListConsumablePart>();

        public virtual Photo Photo { get; set; }
    }
}