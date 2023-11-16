using AutoserviceWPF.Models.ModelsResponse;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AutoserviceWPF.Models.ModelsDB
{
    public partial class Car
    {
        public Guid Id { get; set; }

        [JsonPropertyName("client_id")]
        public Guid ClientId { get; set; }

        public string Number { get; set; }

        public string Name { get; set; }

        [JsonPropertyName("Release_Year")]
        public int? ReleaseYear { get; set; }

        public long? Mileage { get; set; }

        public string Vin { get; set; }

        public string Color { get; set; }

        [JsonPropertyName("engine_id")]
        public int? EngineId { get; set; }

        [JsonPropertyName("photo_id")]
        public Guid? PhotoId { get; set; }

        public virtual Client Client { get; set; }

        public virtual Engine Engine { get; set; }

        public virtual Photo Photo { get; set; }
    }
}