using System.Text.Json.Serialization;

namespace AutoserviceWPF.Models.ModelsResponse
{
    internal class GetCountResponse : BaseResponse
    {
        [JsonPropertyName("count_items")]
        public int CountItems { get; set; }
        [JsonPropertyName("count_pages")]
        public int CountPages { get; set; }
    }
}
