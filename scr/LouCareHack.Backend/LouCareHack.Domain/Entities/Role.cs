namespace LouCareHack.Domain.Entities;

public partial class Role
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public bool IsActive { get; set; }

    public DateTime CreateAt { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
