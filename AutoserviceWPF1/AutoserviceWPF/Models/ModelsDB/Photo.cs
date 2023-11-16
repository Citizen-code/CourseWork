using System;
using System.Collections.Generic;

namespace AutoserviceWPF.Models.ModelsDB
{
    public partial class Photo
    {
        public Guid Id { get; set; }

        public string Extension { get; set; }

        //public virtual ICollection<Car> Cars { get; set; } = new List<Car>();

        //public virtual ICollection<ConsumablePart> ConsumableParts { get; set; } = new List<ConsumablePart>();

        //public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
    }
}