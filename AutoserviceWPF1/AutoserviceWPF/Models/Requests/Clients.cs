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
        public async Task<List<Client>> GetClients(bool include = true, bool pagination = false, int page = 1, OrderType sort = OrderType.None, string findText = "")
        {
            var request = new RestRequest("api/client", Method.Get)
                .AddParameter("include", include ? "true" : "false", ParameterType.QueryString)
                .AddParameter("pagination", pagination ? "true" : "false", ParameterType.QueryString)
                .AddParameter("page", $"{page}", ParameterType.QueryString);
            if (sort != OrderType.None) request.AddParameter("order", $"{(sort == OrderType.Ascending ? "ASC" : "DESC")}", ParameterType.QueryString);
            if (findText != string.Empty) request.AddParameter("text", $"{findText}", ParameterType.QueryString);
            return await ExecuteAsync<List<Client>>(request);
        }

        public async Task<GetCountResponse> GetCountClients(OrderType sort = OrderType.None, string findText = "")
        {
            var request = new RestRequest("api/client/count", Method.Get);
            if (sort != OrderType.None) request.AddParameter("order", $"{(sort == OrderType.Ascending ? "ASC" : "DESC")}", ParameterType.QueryString);
            if (findText != string.Empty) request.AddParameter("text", $"{findText}", ParameterType.QueryString);
            return await ExecuteAsync<GetCountResponse>(request);
        }

        public async Task<Client> GetClient(Guid id, bool include = true)
        {
            var request = new RestRequest("api/client/{id}", Method.Get)
                .AddParameter("include", include ? "true" : "false", ParameterType.QueryString)
                .AddParameter("id", $"{id}", ParameterType.UrlSegment);
            return await ExecuteAsync<Client>(request);
        }

        public async Task<BaseResponse> PutClient(Guid id, Client client)
        {
            var request = new RestRequest("api/client/{id}", Method.Put)
                .AddParameter("id", $"{id}", ParameterType.UrlSegment)
                .AddJsonBody(client);
            return await ExecuteAsync<BaseResponse>(request);
        }
    }
}
