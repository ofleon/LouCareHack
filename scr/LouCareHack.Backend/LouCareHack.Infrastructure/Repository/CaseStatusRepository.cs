using LouCareHack.Domain.Entities;
using LouCareHack.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LouCareHack.Infrastructure.Repository;

public class CaseStatusRepository(LouCareDbContext context) : ICaseStatus
{
    private readonly LouCareDbContext _context = context;

    public async Task<CaseStatus?> GetDetailByIdAsync(Guid id) =>
        await _context.CaseStatuses
        .Include(x => x.Cases)
            .ThenInclude(x => x.CaseManager)
        .FirstOrDefaultAsync(x => x.Id == id);

    public IQueryable<CaseStatus> GetListAsync() =>
        _context.CaseStatuses
            .Include(x => x.Cases);

    public async Task<CaseStatus> SaveAsync(CaseStatus entity, CancellationToken cancellationToken = default)
    {
        _context.CaseStatuses.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity;
    }

    public async Task UpdateAsync(CaseStatus entity, CancellationToken cancellationToken = default)
    {
        _context.CaseStatuses.Update(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
