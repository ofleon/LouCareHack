namespace LouCareHack.Application.Settings;

public class AppSettings
{
    public string DBConnectionString { get; set; } = "";
    public string Secret { get; set; } = "Secret";
    public string Issuer { get; set; } = "LouCareHack";
    public string Audience { get; set; } = "LouCareHack";

    public int HashIteration { get; set; } = 3;
    public string HashPepper { get; set; } = "RCLPepper4782$23";
}
