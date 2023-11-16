using RestSharp;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoserviceWPF.Models.ModelsResponse;
using AutoserviceWPF.Models.ModelsDB;
using static AutoserviceWPF.Models.ApiRestClient;

namespace AutoserviceWPF.Models.Requests
{
    internal class Clients
    {
        public async Task<List<Client>> GetClients(bool include = true, bool pagination = false, int page = 1)
        {
            var request = new RestRequest("api/client", Method.Get)
                .AddParameter("include", include ? "true" : "false", ParameterType.QueryString)
                .AddParameter("pagination", pagination ? "true" : "false", ParameterType.QueryString)
                .AddParameter("page", $"{page}", ParameterType.QueryString);
            return await ExecuteAsync<List<Client>>(request);
        }

        public async Task<GetCountResponse> GetCountClients()
        {
            var request = new RestRequest("api/client/count", Method.Get);
            return await ExecuteAsync<GetCountResponse>(request);
        }

        public async Task<Client> GetClient(Guid id, bool include = true)
        {
            var request = new RestRequest("api/client/{id}", Method.Get)
                .AddParameter("include", include ? "true" : "false", ParameterType.QueryString)
                .AddParameter("id", $"{id}", ParameterType.UrlSegment);
            return await ExecuteAsync<Client>(request);
        }
    }
}
