namespace LouCareHack.Domain.Entities;

public partial class CaseAssignment
{
    public Guid Id { get; set; }

    public Guid CaseId { get; set; }

    public Guid UnitId { get; set; }

    public DateTime CreateAt { get; set; }

    public virtual Case Case { get; set; } = null!;

    public virtual Unit Unit { get; set; } = null!;
}
