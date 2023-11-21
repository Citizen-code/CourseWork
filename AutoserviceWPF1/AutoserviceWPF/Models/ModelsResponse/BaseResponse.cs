using Newtonsoft.Json;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace AutoserviceWPF.Models.ModelsResponse
{
    public class BaseResponse
    {
        [JsonProperty("message")]
        public string Message { get; set; } = string.Empty;
        [JsonProperty("errors")]
        public List<ErrorValidate> Errors { get; set; } = new List<ErrorValidate>();
    }
}
