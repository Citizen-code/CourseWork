using AutoserviceWPF.Models.ModelsResponse;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace AutoserviceWPF.Models.ModelsDB
{
    public partial class ConsumablePart
    {
        public Guid Id { get; set; }

        public string Brand { get; set; }

        public string Article { get; set; }

        public string Name { get; set; }

        public decimal Price { get; set; }

        [JsonProperty("measure_unit")]
        public string MeasureUnit { get; set; }

        [JsonProperty("photo_id")]
        public Guid? PhotoId { get; set; }

        [JsonProperty("Date_Add")]
        public DateTime DateAdd { get; set; }

        //public virtual ICollection<ListConsumablePart> ListConsumableParts { get; set; } = new List<ListConsumablePart>();

        public virtual Photo Photo { get; set; }
    }
}