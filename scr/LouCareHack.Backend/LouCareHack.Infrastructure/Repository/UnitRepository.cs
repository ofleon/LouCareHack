using LouCareHack.Domain.Entities;
using LouCareHack.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LouCareHack.Infrastructure.Repository;

public class UnitRepository(LouCareDbContext context) : IUnit
{
    private readonly LouCareDbContext _context = context;

    public async Task<Unit?> GetDetailByIdAsync(Guid id) =>
        await _context.Units
        .Include(x => x.UnitStatus)
        .FirstOrDefaultAsync(x => x.Id == id);

    public IQueryable<Unit> GetListAsync() =>
        _context.Units
            .Include(x => x.UnitStatus);

    public async Task<Unit> SaveAsync(Unit entity, CancellationToken cancellationToken = default)
    {
        _context.Units.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity;
    }

    public async Task UpdateAsync(Unit entity, CancellationToken cancellationToken = default)
    {
        _context.Units.Update(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
