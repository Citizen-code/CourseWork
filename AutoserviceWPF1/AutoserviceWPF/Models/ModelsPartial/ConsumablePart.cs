using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace AutoserviceWPF.Models.ModelsDB
{
    public partial class ConsumablePart
    {
        public string PhotoUrl { get => Photo == null ? $"/Resources/default.png" : $"{ApiRestClient.Url}photo/{Photo.Id}{Photo.Extension}"; }
    }
}
