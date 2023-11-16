using RestSharp;
using System;
using System.Threading.Tasks;
using AutoserviceWPF.Models.ModelsResponse;

namespace AutoserviceWPF.Models
{
    internal class ApiRestClient
    {
        public static Api Api { get; private set; }
        public static Uri Url { get; private set; }
        private static RestClient RestClient { get; set; }
        private static Authenticator Authenticator { get; set; }

        public static async Task<T> ExecuteAsync<T>(RestRequest request, RestClient client = null) where T : new()
        {
            request.RequestFormat = DataFormat.Json;
            client = client ?? RestClient;
            var response = await client.ExecuteAsync<T>(request);
            if (response.ErrorException != null)
            {
                if (response.Data is BaseResponse)
                    throw new ApiError(response.Data as BaseResponse);
                else
                    throw new Exception(response.ErrorMessage, response.ErrorException);
            }  
            return response.Data;
        }

        public static void CreateApi(Uri uri, string token)
        {
            Authenticator = new Authenticator(uri, token);
            RestClient = new RestClient(new RestClientOptions(uri) { Authenticator = Authenticator });
            Url = uri;
            Api = new Api();
        }

        public static async Task<Api> Login(Uri uri, string login, string password)
        {
            var client = new RestClient(new RestClientOptions(uri));
            var request = new RestRequest("auth/login/employee", Method.Post).AddJsonBody(new { login, password });
            var response = await ExecuteAsync<TokenResponse>(request, client);
            CreateApi(uri, response.RefreshToken);
            return Api;
        }

        public static void Logout() => Authenticator?.Logout();
    }
}
