namespace LouCareHack.Domain.Entities;

public partial class Contact
{
    public Guid UserId { get; set; }

    public string Name { get; set; } = null!;

    public string Type { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public string Email { get; set; } = null!;

    public bool IsActive { get; set; }

    public DateTime CreateAt { get; set; }

    public virtual ICollection<Applicant> Applicants { get; set; } = new List<Applicant>();

    public virtual User User { get; set; } = null!;
}
