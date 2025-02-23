namespace LouCareHack.Application.Identity;

public class AuthenticationResponse
{
    public Guid UserId { get; set; }
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string? Email { get; set; }
    public string Rol { get; set; } = null!;
    public bool Verified { get; set; }
    public string? Token { get; set; }
}
