using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AutoserviceWPF.Models.ModelsRequest
{
    public class ServiceRequest
    {
        public string Name { get; set; }

        public decimal Price { get; set; }

        [JsonPropertyName("is_time_based")]
        public bool? IsTimeBased { get; set; }

    }
}
