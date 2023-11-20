namespace AutoserviceWPF.Models.ModelsDB
{
    partial class Photo
    {
        public string Url { get => $"{ApiRestClient.Url}photo/{Id}{Extension}"; }
    }
}
