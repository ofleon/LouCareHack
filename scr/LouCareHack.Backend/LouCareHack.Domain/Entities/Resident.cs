using LouCareHack.Domain.SeedWork;

namespace LouCareHack.Domain.Entities;

public partial class Resident : BaseEntity
{
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public DateTime DateOfBirth { get; set; }
    public string Gender { get; set; } = null!;
    public string PhoneNumber { get; set; } = null!;
    public string Email { get; set; } = null!;
    public bool IsActive { get; set; }
}