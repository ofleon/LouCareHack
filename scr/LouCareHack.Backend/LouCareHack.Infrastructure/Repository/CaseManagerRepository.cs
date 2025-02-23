using LouCareHack.Domain.Entities;
using LouCareHack.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LouCareHack.Infrastructure.Repository;

public class CaseManagerRepository(LouCareDbContext context) : ICaseManager
{
    private readonly LouCareDbContext _context = context;

    public async Task<CaseManager?> GetDetailByIdAsync(Guid id) =>
        await _context.CaseManagers
        .Include(x => x.User)
        .Include(x => x.Cases)
        .FirstOrDefaultAsync(x => x.UserId == id);

    public IQueryable<CaseManager> GetListAsync() =>
        _context.CaseManagers
            .Include(x => x.Cases);

    public async Task<CaseManager> SaveAsync(CaseManager entity, CancellationToken cancellationToken = default)
    {
        _context.CaseManagers.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity;
    }

    public async Task UpdateAsync(CaseManager entity, CancellationToken cancellationToken = default)
    {
        _context.CaseManagers.Update(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
