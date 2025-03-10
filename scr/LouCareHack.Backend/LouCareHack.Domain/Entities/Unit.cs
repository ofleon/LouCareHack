﻿namespace LouCareHack.Domain.Entities;

public partial class Unit
{
    public Guid Id { get; set; }

    public string Address { get; set; } = null!;

    public string City { get; set; } = null!;

    public string State { get; set; } = null!;

    public string Zip { get; set; } = null!;

    public string Type { get; set; } = null!;

    public int Capacity { get; set; }

    public Guid UnitStatusId { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreateAt { get; set; }

    public virtual ICollection<CaseAssignment> CaseAssignments { get; set; } = new List<CaseAssignment>();

    public virtual UnitStatus UnitStatus { get; set; } = null!;
}
