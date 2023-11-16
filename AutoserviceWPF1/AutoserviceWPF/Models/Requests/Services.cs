using RestSharp;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoserviceWPF.Models.ModelsDB;
using AutoserviceWPF.Models.ModelsResponse;
using static AutoserviceWPF.Models.ApiRestClient;

namespace AutoserviceWPF.Models.Requests
{
    class Services
    {
        public async Task<List<Service>> GetServices(bool all = false, bool pagination = false, int page = 1, bool include = true)
        {
            var request = new RestRequest("api/service", Method.Get)
                .AddParameter("all", all ? "true" : "false", ParameterType.QueryString)
                .AddParameter("pagination", pagination ? "true" : "false", ParameterType.QueryString)
                .AddParameter("include", include ? "true" : "false", ParameterType.QueryString)
                .AddParameter("page", $"{page}", ParameterType.QueryString);
            return await ExecuteAsync<List<Service>>(request);
        }

        public async Task<GetCountResponse> GetCountServices()
        {
            var request = new RestRequest("api/service/count", Method.Get);
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

        public async Task<BaseResponse> PostService(Service service)
        {
            var request = new RestRequest("api/service", Method.Post)
                .AddJsonBody(service);
            return await ExecuteAsync<BaseResponse>(request);
        }

        public async Task<BaseResponse> PutService(Guid id, Service service)
        {
            var request = new RestRequest("api/service/{id}", Method.Put)
                .AddParameter("id", $"{id}", ParameterType.UrlSegment)
                .AddJsonBody(service);
            return await ExecuteAsync<BaseResponse>(request);
        }
    }
}
