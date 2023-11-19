using RestSharp;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoserviceWPF.Models.ModelsResponse;
using static AutoserviceWPF.Models.ApiRestClient;
using AutoserviceWPF.Models.ModelsDB;

namespace AutoserviceWPF.Models.Requests
{
    class Orders
    {
        public async Task<List<Orders>> GetOrders(bool include = true, bool pagination = false, int page = 1)
        {
            var request = new RestRequest("api/order", Method.Get)
                .AddParameter("include", include ? "true" : "false", ParameterType.QueryString)
                .AddParameter("pagination", pagination ? "true" : "false", ParameterType.QueryString)
                .AddParameter("page", $"{page}", ParameterType.QueryString);
            return await ExecuteAsync<List<Orders>>(request);
        }

        public async Task<GetCountResponse> GetCountOrders()
        {
            var request = new RestRequest("api/order/count", Method.Get);
            return await ExecuteAsync<GetCountResponse>(request);
        }

        public async Task<Orders> GetOrder(Guid id, bool include = true)
        {
            var request = new RestRequest("api/order/{id}", Method.Get)
                .AddParameter("include", include ? "true" : "false", ParameterType.QueryString)
                .AddParameter("id", $"{id}", ParameterType.UrlSegment);
            return await ExecuteAsync<Orders>(request);
        }

        public async Task<List<Orders>> GetOrdersClient(Guid id, bool include = true, bool pagination = false, int page = 1)
        {
            var request = new RestRequest("api/order/client/{id}", Method.Get)
                .AddParameter("id", $"{id}", ParameterType.UrlSegment)
                .AddParameter("include", include ? "true" : "false", ParameterType.QueryString)
                .AddParameter("pagination", pagination ? "true" : "false", ParameterType.QueryString)
                .AddParameter("page", $"{page}", ParameterType.QueryString);
            return await ExecuteAsync<List<Orders>>(request);
        }

        public async Task<BaseResponse> AddContentOrder(Guid id, List<ListService> list_services, List<ListConsumablePart> list_consumable_parts)
        {
            var request = new RestRequest("api/order/{id}", Method.Post)
                .AddParameter("id", $"{id}", ParameterType.UrlSegment)
                .AddBody(new {
                    list_services,
                    list_consumable_parts,
                });
            return await ExecuteAsync<BaseResponse>(request);
        }

        public async Task<BaseResponse> DeleteOrder(Guid id)
        {
            var request = new RestRequest("api/order/{id}", Method.Delete)
                .AddParameter("id", $"{id}", ParameterType.UrlSegment);
            return await ExecuteAsync<BaseResponse>(request);
        }
    }
}
