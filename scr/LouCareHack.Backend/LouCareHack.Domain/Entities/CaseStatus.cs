﻿using System.Text.Json.Serialization;

namespace LouCareHack.Domain.Entities;

public partial class CaseStatus
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Case> Cases { get; set; } = new List<Case>();
}
