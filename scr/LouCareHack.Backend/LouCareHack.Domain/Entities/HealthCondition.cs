using LouCareHack.Domain.SeedWork;

namespace LouCareHack.Domain.Entities;

public class HealthCondition : BaseEntity
{
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
}
