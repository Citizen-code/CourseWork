namespace AutoserviceWPF.Models.ModelsDB
{
    partial class Photo
    {
        public string Url { get => $"{ApiRestClient.Url.AbsoluteUri}photo/{Id}{Extension}"; }
    }
}
