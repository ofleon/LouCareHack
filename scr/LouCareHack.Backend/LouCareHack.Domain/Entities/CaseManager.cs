namespace LouCareHack.Domain.Entities;

public partial class CaseManager
{
    public Guid UserId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public string Email { get; set; } = null!;

    public bool IsActive { get; set; }

    public DateTime CreateAt { get; set; }

    public virtual ICollection<Case> Cases { get; set; } = new List<Case>();

    public virtual User User { get; set; } = null!;
}
