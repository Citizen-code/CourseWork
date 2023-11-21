using Newtonsoft.Json;

namespace AutoserviceWPF.Models.ModelsResponse
{
    internal class GetCountResponse : BaseResponse
    {
        [JsonProperty("count_items")]
        public int CountItems { get; set; }
        [JsonProperty("count_pages")]
        public int CountPages { get; set; }
    }
}
