using System;
using System.Threading.Tasks;
using RestSharp;
using RestSharp.Authenticators;
using AutoserviceWPF.Models.ModelsResponse;

namespace AutoserviceWPF.Models
{
    internal class Authenticator : AuthenticatorBase
    {
        public Uri Url { get; set; }
        public string RefreshToken { get; set; }
        public RestClient Client { get; set; }

        public Authenticator(Uri url, string refreshToken) : base("")
        {
            Url = url;
            RefreshToken = refreshToken;
            Client = new RestClient(new RestClientOptions(url));
            _ = Refresh();
        }

        private async Task<bool> Refresh()
        {
            var request = new RestRequest("auth/refresh/employee")
                .AddCookie("refreshToken", RefreshToken, "/", Url.Host);
            var response = await Client.GetAsync<TokenResponse>(request);
            SetTokens(response);
            return true;
        }

        private async Task<bool> Validate(string accessToken)
        {
            try {
                var request = new RestRequest("auth/validate")
                    .AddHeader("Authorization", $"Bearer {accessToken}");
                await Client.GetAsync(request);
                return true;
            }
            catch {
                await Refresh();
                return true;
            }
        }

        protected override async ValueTask<Parameter> GetAuthenticationParameter(string accessToken)
        {
            await Validate(accessToken);
            return new HeaderParameter(KnownHeaders.Authorization, $"Bearer {Token}");
        }

        private void SetTokens(TokenResponse response)
        {
            Token = response.AccessToken;
            RefreshToken = response.RefreshToken;
        }

        public async void Logout()
        {
            var request = new RestRequest("auth/logout/employee")
                .AddCookie("refreshToken", RefreshToken, "/", Url.Host);
            await Client.PostAsync(request);
            Token = "";
        }
    }
}
