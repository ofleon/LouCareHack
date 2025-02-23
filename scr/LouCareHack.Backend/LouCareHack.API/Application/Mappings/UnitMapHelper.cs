using LouCareHack.API.Application.DTOs;
using LouCareHack.Domain.Entities;

namespace LouCareHack.API.Application.Mappings;

public class UnitMapHelper
{
    public static UnitDTO MapUnitDTO(Unit unit)
    {
        return new UnitDTO
        {
            Id = unit.Id,
            Address = unit.Address,
            City = unit.City,
            State = unit.State,
            Zip = unit.Zip,
            Type = unit.Type,
            Capacity = unit.Capacity,
            UnitStatusId = unit.UnitStatusId,
            UnitStatusName = unit.UnitStatus.Name,
            IsActive = unit.IsActive,
            CreateAt = unit.CreateAt
        };
    }
}
