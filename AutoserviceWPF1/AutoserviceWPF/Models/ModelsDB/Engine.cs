using System;
using System.Collections.Generic;

namespace AutoserviceWPF.Models.ModelsDB
{
    public partial class Engine
    {
        public int Id { get; set; }

        public string Name { get; set; }

        //public virtual ICollection<Car> Cars { get; set; } = new List<Car>();
    }
}