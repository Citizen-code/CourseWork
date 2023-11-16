using RestSharp;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoserviceWPF.Models.ModelsDB;
using AutoserviceWPF.Models.ModelsResponse;
using static AutoserviceWPF.Models.ApiRestClient;

namespace AutoserviceWPF.Models.Requests
{
    class ConsumableParts
    {
        public async Task<List<ConsumablePart>> GetServices(bool include = true, bool pagination = false, int page = 1)
        {
            var request = new RestRequest("api/consumable-part", Method.Get)
                .AddParameter("include", include ? "true" : "false", ParameterType.QueryString)
                .AddParameter("pagination", pagination ? "true" : "false", ParameterType.QueryString)
                .AddParameter("page", $"{page}", ParameterType.QueryString);
            return await ExecuteAsync<List<ConsumablePart>>(request);
        }

        public async Task<GetCountResponse> GetCountServices()
        {
            var request = new RestRequest("api/consumable-part/count", Method.Get);
            return await ExecuteAsync<GetCountResponse>(request);
        }

        public async Task<ConsumablePart> GetService(Guid id, bool include = true)
        {
            var request = new RestRequest("api/consumable-part/{id}", Method.Get)
                .AddParameter("include", include ? "true" : "false", ParameterType.QueryString)
                .AddParameter("id", $"{id}", ParameterType.UrlSegment);
            return await ExecuteAsync<ConsumablePart>(request);
        }

        public async Task<BaseResponse> PostService(ConsumablePart consumable_part)
        {
            var request = new RestRequest("api/consumable-part", Method.Post)
                .AddJsonBody(consumable_part);
            return await ExecuteAsync<BaseResponse>(request);
        }
        
        public async Task<BaseResponse> PutService(Guid id, ConsumablePart consumable_part)
        {
            var request = new RestRequest("api/consumable-part/{id}", Method.Put)
                .AddParameter("id", $"{id}", ParameterType.UrlSegment)
                .AddJsonBody(consumable_part);
            return await ExecuteAsync<BaseResponse>(request);
        }
    }
}
