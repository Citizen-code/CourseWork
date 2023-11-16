using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AutoserviceWPF.Models.ModelsDB
{
    public partial class Employee
    {
        public Guid Id { get; set; }

        public string Surname { get; set; }

        public string Firstname { get; set; }

        public string Lastname { get; set; }

        [JsonPropertyName("photo_id")]
        public Guid? PhotoId { get; set; }

        //public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

        public virtual Photo Photo { get; set; }

    }
}