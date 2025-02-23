namespace LouCareHack.Domain.Entities;

public partial class Applicant
{
    public Guid UserId { get; set; }

    public Guid? ContactId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public DateOnly DoB { get; set; }

    public Guid ConditionId { get; set; }

    public string Gender { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    public string? Email { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreateAt { get; set; }

    public virtual HealthCondition Condition { get; set; } = null!;

    public virtual Contact? Contact { get; set; }

    public virtual User User { get; set; } = null!;
}
