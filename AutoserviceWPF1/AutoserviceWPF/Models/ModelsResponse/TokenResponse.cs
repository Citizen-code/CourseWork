using Newtonsoft.Json;

namespace AutoserviceWPF.Models.ModelsResponse
{
    internal class TokenResponse: BaseResponse
    {
        [JsonProperty("accessToken")]
        public string AccessToken { get; set; } = string.Empty;

        [JsonProperty("refreshToken")]
        public string RefreshToken { get; set; } = string.Empty;
    }
}
