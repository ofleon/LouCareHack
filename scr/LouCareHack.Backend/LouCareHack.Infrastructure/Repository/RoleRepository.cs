using LouCareHack.Domain.Entities;
using LouCareHack.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LouCareHack.Infrastructure.Repository;

public class RoleRepository(LouCareDbContext context) : IRole
{
    private readonly LouCareDbContext _context = context;

    public async Task<Role?> GetDetailByIdAsync(Guid id) =>
        await _context.Roles
            .FirstOrDefaultAsync(x => x.Id == id);

    public IQueryable<Role> GetListAsync() =>
        _context.Roles;

    public async Task<Role> SaveAsync(Role entity, CancellationToken cancellationToken = default)
    {
        _context.Roles.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity;
    }

    public async Task UpdateAsync(Role entity, CancellationToken cancellationToken = default)
    {
        _context.Roles.Update(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
