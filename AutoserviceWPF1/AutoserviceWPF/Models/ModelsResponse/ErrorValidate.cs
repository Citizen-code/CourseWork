using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AutoserviceWPF.Models.ModelsResponse
{
    public class ErrorValidate
    {
        [JsonPropertyName("location")]
        public string Location { get; set; }
        [JsonPropertyName("msg")]
        public string Message { get; set; }
        [JsonPropertyName("path")]
        public string Path { get; set; }
        [JsonPropertyName("type")]
        public string Type { get; set; }
        [JsonPropertyName("value")]
        public string Value { get; set; }

        public override string ToString()
        {
            return $"{Path}: {Message}";
        }
    }
}
