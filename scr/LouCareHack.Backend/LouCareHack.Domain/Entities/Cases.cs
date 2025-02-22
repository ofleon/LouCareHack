using LouCareHack.Domain.SeedWork;

namespace LouCareHack.Domain.Entities;

public class Cases : BaseEntity
{
    public Guid ResidentId { get; set; }
    public short PriorityLevel { get; set; }
    public DateTime CaseDate { get; set; }
    public Guid CaseStatusId { get; set; }
}
