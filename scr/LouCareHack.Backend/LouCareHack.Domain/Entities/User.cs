using System.Text.Json.Serialization;

namespace LouCareHack.Domain.Entities;

public partial class User
{
    public Guid Id { get; set; }

    public Guid RoleId { get; set; }

    public string PasswordHash { get; set; } = null!;

    public string Salt { get; set; } = null!;

    public bool IsActive { get; set; }

    public DateTime CreateAt { get; set; }

    [JsonIgnore]
    public virtual Applicant? Applicant { get; set; }

    public virtual CaseManager? CaseManager { get; set; }

    [JsonIgnore]
    public virtual ICollection<Case> Cases { get; set; } = new List<Case>();

    public virtual Contact? Contact { get; set; }

    public virtual Role Role { get; set; } = null!;
}
