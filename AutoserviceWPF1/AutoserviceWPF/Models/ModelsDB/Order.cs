using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace AutoserviceWPF.Models.ModelsDB
{
    public partial class Order
    {
        public Guid Id { get; set; }

        public DateTime Date { get; set; }

        public string Time { get; set; }

        public string Comment { get; set; }

        [JsonProperty("Client_Id")]
        public Guid ClientId { get; set; }

        [JsonProperty("Employee_Id")]
        public Guid? EmployeeId { get; set; }

        [JsonProperty("Status_Id")]
        public int StatusId { get; set; }

        public virtual Client Client { get; set; }

        public virtual Employee Employee { get; set; }

        [JsonProperty("List_Consumable_Parts")]
        public virtual ICollection<ListConsumablePart> ListConsumableParts { get; set; } = new List<ListConsumablePart>();

        [JsonProperty("List_Services")]
        public virtual ICollection<ListService> ListServices { get; set; } = new List<ListService>();

        public virtual StatusOrder Status { get; set; }
    }
}