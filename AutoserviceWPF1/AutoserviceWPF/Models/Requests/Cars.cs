using RestSharp;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoserviceWPF.Models.ModelsDB;
using AutoserviceWPF.Models.ModelsResponse;
using static AutoserviceWPF.Models.ApiRestClient;

namespace AutoserviceWPF.Models.Requests
{
    class Cars
    {
        public async Task<List<Car>> GetCars(bool include = true, bool pagination = false, int page = 1)
        {
            var request = new RestRequest("api/car", Method.Get)
                .AddParameter("include", include ? "true" : "false", ParameterType.QueryString)
                .AddParameter("pagination", pagination ? "true" : "false", ParameterType.QueryString)
                .AddParameter("page", $"{page}", ParameterType.QueryString);
            return await ExecuteAsync<List<Car>>(request);
        }

        public async Task<GetCountResponse> GetCountCars()
        {
            var request = new RestRequest("api/car/count", Method.Get);
            return await ExecuteAsync<GetCountResponse>(request);
        }

        public async Task<Car> GetCar(Guid id, bool include = true)
        {
            var request = new RestRequest("api/car/{id}", Method.Get)
                .AddParameter("include", include ? "true" : "false", ParameterType.QueryString)
                .AddParameter("id", $"{id}", ParameterType.UrlSegment);
            return await ExecuteAsync<Car>(request);
        }

        public async Task<BaseResponse> PutCar(Guid id, Car car)
        {
            var request = new RestRequest("api/car/{id}", Method.Put)
                .AddParameter("id", $"{id}", ParameterType.UrlSegment)
                .AddJsonBody(car);
            return await ExecuteAsync<BaseResponse>(request);
        }
    }
}
