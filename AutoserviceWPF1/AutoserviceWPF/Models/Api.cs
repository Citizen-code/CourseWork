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
        public Cars Cars { get; set; }
        public ConsumableParts ConsumableParts { get; set; }
        public Employees Employees { get; set; }
        public Engine Engine { get; set; }
        public Orders Orders { get; set; }
        public Photo Photo { get; set; }
        public Services Services { get; set; }

        public Api() 
        { 
            Client = new Clients();
            Cars = new Cars();
            ConsumableParts = new ConsumableParts();
            Employees = new Employees();
            Engine = new Engine();
            Orders = new Orders();
            Photo = new Photo();
            Services = new Services();
        }
    }
}
