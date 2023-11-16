using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AutoserviceWPF.Models.ModelsResponse
{
    public class BaseResponse
    {
        [JsonPropertyName("message")]
        public string Message { get; set; } = string.Empty;
        [JsonPropertyName("errors")]
        public List<ErrorValidate> Errors { get; set; } = new List<ErrorValidate>();
    }
}
