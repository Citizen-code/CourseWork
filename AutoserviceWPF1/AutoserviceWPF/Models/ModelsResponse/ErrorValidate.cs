using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace AutoserviceWPF.Models.ModelsResponse
{
    public class ErrorValidate
    {
        [JsonProperty("location")]
        public string Location { get; set; }
        [JsonProperty("msg")]
        public string Message { get; set; }
        [JsonProperty("path")]
        public string Path { get; set; }
        [JsonProperty("type")]
        public string Type { get; set; }
        [JsonProperty("value")]
        public string Value { get; set; }

        public override string ToString()
        {
            return $"{Path}: {Message}";
        }
    }
}
