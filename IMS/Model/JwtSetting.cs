namespace IMS.Model
{
    public class JwtSetting
    {
        public string SecretKey { get; set; }
        public string Audience { get; set; }
        public string Issuer { get; set; }
    }
    public class Base64Image
    {
        public string base64String { get; set; }
    }
}
