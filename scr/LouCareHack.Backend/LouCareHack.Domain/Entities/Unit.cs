using LouCareHack.Domain.SeedWork;

namespace LouCareHack.Domain.Entities;

public class Unit : BaseEntity
{
    public string Address { get; set; } = null!;
    public short UnitType { get; set; }
    public int Rooms { get; set; }
    public int Bathrooms { get; set; }
    public Guid AvailabilityStatusId { get; set; }
}
