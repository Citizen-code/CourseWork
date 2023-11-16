using System.Text.Json.Serialization;

namespace AutoserviceWPF.Models.ModelsResponse
{
    internal class TokenResponse: BaseResponse
    {
        [JsonPropertyName("accessToken")]
        public string AccessToken { get; set; } = string.Empty;

        [JsonPropertyName("refreshToken")]
        public string RefreshToken { get; set; } = string.Empty;
    }
}
