using AutoserviceWPF.Models.Requests;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoserviceWPF.Models
{
    internal class Api
    {
        public Clients Client { get; set; }

        public Api() 
        { 
            Client = new Clients();
        }
    }
}
