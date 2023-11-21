using AutoserviceWPF.Models.ModelsResponse;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace AutoserviceWPF.Models.ModelsDB
{
    public partial class Car
    {
        public Guid Id { get; set; }

        [JsonProperty("client_id")]
        public Guid ClientId { get; set; }

        public string Number { get; set; }

        public string Name { get; set; }

        [JsonProperty("Release_Year")]
        public int? ReleaseYear { get; set; }

        public long? Mileage { get; set; }

        public string Vin { get; set; }

        public string Color { get; set; }

        [JsonProperty("engine_id")]
        public int? EngineId { get; set; }

        [JsonProperty("photo_id")]
        public Guid? PhotoId { get; set; }

        public virtual Client Client { get; set; }

        public virtual Engine Engine { get; set; }

        public virtual Photo Photo { get; set; }
    }
}