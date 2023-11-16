using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AutoserviceWPF.Models.ModelsDB
{
    public partial class Order
    {
        public Guid Id { get; set; }

        public DateTime Date { get; set; }

        public DateTime Time { get; set; }

        public string Comment { get; set; }

        [JsonPropertyName("Client_Id")]
        public Guid ClientId { get; set; }

        [JsonPropertyName("Employee_Id")]
        public Guid? EmployeeId { get; set; }

        [JsonPropertyName("Status_Id")]
        public int StatusId { get; set; }

        public virtual Client Client { get; set; }

        public virtual Employee Employee { get; set; }

        [JsonPropertyName("List_Consumable_Parts")]
        public virtual ICollection<ListConsumablePart> ListConsumableParts { get; set; } = new List<ListConsumablePart>();

        [JsonPropertyName("List_Services")]
        public virtual ICollection<ListService> ListServices { get; set; } = new List<ListService>();

        public virtual StatusOrder Status { get; set; }
    }
}