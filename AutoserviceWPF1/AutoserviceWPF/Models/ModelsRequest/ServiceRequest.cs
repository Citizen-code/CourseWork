using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace AutoserviceWPF.Models.ModelsRequest
{
    public class ServiceRequest
    {
        public string Name { get; set; }

        public decimal Price { get; set; }

        [JsonProperty("is_time_based")]
        public bool? IsTimeBased { get; set; }

    }
}
