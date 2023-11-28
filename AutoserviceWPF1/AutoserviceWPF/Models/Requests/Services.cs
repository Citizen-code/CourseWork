using RestSharp;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoserviceWPF.Models.ModelsDB;
using AutoserviceWPF.Models.ModelsResponse;
using static AutoserviceWPF.Models.ApiRestClient;
using AutoserviceWPF.Models.ModelsRequest;

namespace AutoserviceWPF.Models.Requests
{
    class Services
    {
        public async Task<List<Service>> GetServices(bool all = false, bool pagination = false, int page = 1, bool include = true, OrderType sort = OrderType.None, string findText = "")
        {
            var request = new RestRequest("api/service", Method.Get)
                .AddParameter("pagination", pagination ? "true" : "false", ParameterType.QueryString)
                .AddParameter("include", include ? "true" : "false", ParameterType.QueryString)
                .AddParameter("page", $"{page}", ParameterType.QueryString);
            if (all == true) request.AddParameter("all", "true", ParameterType.QueryString);
            if (sort != OrderType.None) request.AddParameter("order", $"{(sort==OrderType.Ascending?"ASC":"DESC")}", ParameterType.QueryString);
            if (findText != string.Empty) request.AddParameter("text", $"{findText}", ParameterType.QueryString);

            return await ExecuteAsync<List<Service>>(request);
        }

        public async Task<GetCountResponse> GetCountServices(bool all = false, OrderType sort = OrderType.None, string findText = "")
        {
            var request = new RestRequest("api/service/count", Method.Get);
            if(all == true) request.AddParameter("all", "true", ParameterType.QueryString);
            if (sort != OrderType.None) request.AddParameter("order", $"{(sort == OrderType.Ascending ? "ASC" : "DESC")}", ParameterType.QueryString);
            if (findText != string.Empty) request.AddParameter("text", $"{findText}", ParameterType.QueryString);
            return await ExecuteAsync<GetCountResponse>(request);
        }

        public async Task<Service> GetService(Guid id, bool all = false, bool include = true)
        {
            var request = new RestRequest("api/service/{id}", Method.Get)
                .AddParameter("all", all ? "true" : "false", ParameterType.QueryString)
                .AddParameter("include", include ? "true" : "false", ParameterType.QueryString)
                .AddParameter("id", $"{id}", ParameterType.UrlSegment);
            return await ExecuteAsync<Service>(request);
        }

        public async Task<BaseResponse> DeleteService(Guid id)
        {
            var request = new RestRequest("api/service/{id}", Method.Delete)
                .AddParameter("id", $"{id}", ParameterType.UrlSegment);
            return await ExecuteAsync<BaseResponse>(request);
        }

        public async Task<BaseResponse> PostService(ServiceRequest service)
        {
            var request = new RestRequest("api/service", Method.Post)
                .AddJsonBody(service);
            return await ExecuteAsync<BaseResponse>(request);
        }

        public async Task<BaseResponse> PutService(Guid id, ServiceRequest service)
        {
            var request = new RestRequest("api/service/{id}", Method.Put)
                .AddParameter("id", $"{id}", ParameterType.UrlSegment)
                .AddJsonBody(service);
            return await ExecuteAsync<BaseResponse>(request);
        }
    }
}
