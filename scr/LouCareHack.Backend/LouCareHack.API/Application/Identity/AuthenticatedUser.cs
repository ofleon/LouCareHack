namespace LouCareHack.Application.Identity;

public class AuthenticatedUser
{
    public Guid UserId { get; set; }

    public Guid RolId { get; set; }

    public string RolName { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string Salt { get; set; } = null!;

    public bool IsActive { get; set; }
}
