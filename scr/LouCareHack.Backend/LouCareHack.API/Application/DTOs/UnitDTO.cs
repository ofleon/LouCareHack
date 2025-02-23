namespace LouCareHack.API.Application.DTOs;

public class UnitDTO
{
    public Guid Id { get; set; }

    public string Address { get; set; } = null!;

    public string City { get; set; } = null!;

    public string State { get; set; } = null!;

    public string Zip { get; set; } = null!;

    public string Type { get; set; } = null!;

    public int Capacity { get; set; }

    public Guid UnitStatusId { get; set; }

    public string? UnitStatusName { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreateAt { get; set; }
}
