﻿using RestSharp;
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
    }
}
