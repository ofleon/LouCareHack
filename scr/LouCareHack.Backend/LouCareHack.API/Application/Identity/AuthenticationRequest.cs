namespace LouCareHack.Application.Identity;

public class AuthenticationRequest
{
    public Guid UserId { get; set; }

    public string Password { get; set; } = null!;
}
