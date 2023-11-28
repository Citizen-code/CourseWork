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
        public async Task<List<ConsumablePart>> GetConsumableParts(bool include = true, bool pagination = false, int page = 1, OrderType sort = OrderType.None, string findText = "")
        {
            var request = new RestRequest("api/consumable-part", Method.Get)
                .AddParameter("include", include ? "true" : "false", ParameterType.QueryString)
                .AddParameter("pagination", pagination ? "true" : "false", ParameterType.QueryString)
                .AddParameter("page", $"{page}", ParameterType.QueryString);
            if (sort != OrderType.None) request.AddParameter("order", $"{(sort == OrderType.Ascending ? "ASC" : "DESC")}", ParameterType.QueryString);
            if (findText != string.Empty) request.AddParameter("text", $"{findText}", ParameterType.QueryString);
            return await ExecuteAsync<List<ConsumablePart>>(request);
        }

        public async Task<GetCountResponse> GetCountConsumableParts(OrderType sort = OrderType.None, string findText = "")
        {
            var request = new RestRequest("api/consumable-part/count", Method.Get);
            if (sort != OrderType.None) request.AddParameter("order", $"{(sort == OrderType.Ascending ? "ASC" : "DESC")}", ParameterType.QueryString);
            if (findText != string.Empty) request.AddParameter("text", $"{findText}", ParameterType.QueryString);
            return await ExecuteAsync<GetCountResponse>(request);
        }

        public async Task<ConsumablePart> GetConsumablePart(Guid id, bool include = true)
        {
            var request = new RestRequest("api/consumable-part/{id}", Method.Get)
                .AddParameter("include", include ? "true" : "false", ParameterType.QueryString)
                .AddParameter("id", $"{id}", ParameterType.UrlSegment);
            return await ExecuteAsync<ConsumablePart>(request);
        }

        public async Task<BaseResponse> PostConsumablePart(ConsumablePart consumable_part)
        {
            var request = new RestRequest("api/consumable-part", Method.Post)
                .AddJsonBody(consumable_part);
            return await ExecuteAsync<BaseResponse>(request);
        }
        
        public async Task<BaseResponse> PutConsumablePart(Guid id, ConsumablePart consumable_part)
        {
            var request = new RestRequest("api/consumable-part/{id}", Method.Put)
                .AddParameter("id", $"{id}", ParameterType.UrlSegment)
                .AddJsonBody(consumable_part);
            return await ExecuteAsync<BaseResponse>(request);
        }
    }
}
