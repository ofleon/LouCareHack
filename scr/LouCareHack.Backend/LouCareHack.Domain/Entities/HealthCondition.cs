using System.Text.Json.Serialization;

namespace LouCareHack.Domain.Entities;

public partial class HealthCondition
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Applicant> Applicants { get; set; } = new List<Applicant>();
}
