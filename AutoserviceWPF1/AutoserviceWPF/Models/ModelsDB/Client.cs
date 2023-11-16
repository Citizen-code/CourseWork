using AutoserviceWPF.Models.ModelsResponse;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AutoserviceWPF.Models.ModelsDB
{
    public partial class Client
    {
        public Guid Id { get; set; }

        public string Surname { get; set; }

        public string Firstname { get; set; }

        public string Lastname { get; set; }

        [JsonPropertyName("Birth_Date")]
        public DateTime BirthDate { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public virtual Car Car { get; set; }

        //public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    }
}