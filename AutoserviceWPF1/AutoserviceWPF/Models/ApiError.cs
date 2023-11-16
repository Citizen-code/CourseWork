using AutoserviceWPF.Models.ModelsResponse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoserviceWPF.Models
{
    [Serializable]
    public class ApiError : Exception
    {
        public BaseResponse Error { get; set; }
        public ApiError(BaseResponse response) : base(response.Message)
        {
            Error = response;
        }
    }
}
