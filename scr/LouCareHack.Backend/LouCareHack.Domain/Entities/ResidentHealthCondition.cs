namespace LouCareHack.Domain.Entities;

public class ResidentHealthCondition
{
    public Guid ResidentId { get; set; }
    public Guid ConditionId { get; set; }
    public DateTime DiagnosedDate { get; set; }
    public bool IsActive { get; set; }
}
