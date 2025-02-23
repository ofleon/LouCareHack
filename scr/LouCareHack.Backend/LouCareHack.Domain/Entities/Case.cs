using System.Text.Json.Serialization;

namespace LouCareHack.Domain.Entities;

public partial class Case
{
    public Guid Id { get; set; }

    public int CaseNumber { get; set; }

    public Guid UserId { get; set; }

    public Guid? CaseManagerId { get; set; }

    public Guid CaseStatusId { get; set; }

    public int Priority { get; set; }

    public DateTime CaseDate { get; set; }

    public DateTime CreateAt { get; set; }

    [JsonIgnore]
    public virtual ICollection<CaseAssignment> CaseAssignments { get; set; } = new List<CaseAssignment>();

    public virtual CaseManager? CaseManager { get; set; }

    public virtual CaseStatus CaseStatus { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
