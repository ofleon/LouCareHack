using System.Text.Json.Serialization;

namespace LouCareHack.Domain.Entities;

public partial class UnitStatus
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Unit> Units { get; set; } = [];
}
