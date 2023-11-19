using RestSharp;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoserviceWPF.Models.ModelsDB;
using AutoserviceWPF.Models.ModelsResponse;
using static AutoserviceWPF.Models.ApiRestClient;

namespace AutoserviceWPF.Models.Requests
{
    class Photo
    {
        public async Task<Photo> PostPhoto(string url)
        {
            var request = new RestRequest("api/photo", Method.Post)
                .AddFile("photo", url);

            return await ExecuteAsync<Photo>(request);
        }

        public async Task<Photo> PostPhoto(byte[] image, string name)
        {
            var request = new RestRequest("api/photo", Method.Post)
                .AddFile("photo", image, name);

            return await ExecuteAsync<Photo>(request);
        }
    }
}
