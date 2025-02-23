using LouCareHack.Domain.Entities;
using LouCareHack.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LouCareHack.Infrastructure.Repository;

public class HealthConditionRepository(LouCareDbContext context) : IHealthCondition
{
    private readonly LouCareDbContext _context = context;

    public async Task<HealthCondition?> GetDetailByIdAsync(Guid id) =>
        await _context.HealthConditions
        .Include(x => x.Applicants)
        .FirstOrDefaultAsync(x => x.Id == id);

    public IQueryable<HealthCondition> GetListAsync() =>
        _context.HealthConditions
            .Include(x => x.Applicants);

    public async Task<HealthCondition> SaveAsync(HealthCondition entity, CancellationToken cancellationToken = default)
    {
        _context.HealthConditions.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity;
    }

    public async Task UpdateAsync(HealthCondition entity, CancellationToken cancellationToken = default)
    {
        _context.HealthConditions.Update(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
