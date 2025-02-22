namespace LouCareHack.Domain.SeedWork;

public class BaseEntity
{
    public virtual Guid Id { get; set; }
    public DateTime CreateAt { get; set; }
}
