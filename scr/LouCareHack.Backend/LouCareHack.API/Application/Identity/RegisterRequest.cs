namespace LouCareHack.Application.Identity;

public class RegisterRequest
{
    public Guid UserId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public DateTime? DoB {  get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Gender { get; set; } = null!;

    public Guid RoleId { get; set; }

    public string Password { get; set; } = null!;
}
