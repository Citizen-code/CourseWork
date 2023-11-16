using RestSharp;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoserviceWPF.Models.ModelsDB;
using AutoserviceWPF.Models.ModelsResponse;
using static AutoserviceWPF.Models.ApiRestClient;

namespace AutoserviceWPF.Models.Requests
{
    class Employees
    {
        public async Task<List<Employee>> GetEmployees(bool include = true, bool pagination = false, int page = 1)
        {
            var request = new RestRequest("api/employee", Method.Get)
                .AddParameter("include", include ? "true" : "false", ParameterType.QueryString)
                .AddParameter("pagination", pagination ? "true" : "false", ParameterType.QueryString)
                .AddParameter("page", $"{page}", ParameterType.QueryString);
            return await ExecuteAsync<List<Employee>>(request);
        }

        public async Task<GetCountResponse> GetCountEmployees()
        {
            var request = new RestRequest("api/employee/count", Method.Get);
            return await ExecuteAsync<GetCountResponse>(request);
        }

        public async Task<Employee> GetEmployee(Guid id, bool include = true)
        {
            var request = new RestRequest("api/employee/{id}", Method.Get)
                .AddParameter("include", include ? "true" : "false", ParameterType.QueryString)
                .AddParameter("id", $"{id}", ParameterType.UrlSegment);
            return await ExecuteAsync<Employee>(request);
        }
    }
}
