using LouCareHack.Domain.Entities;
using LouCareHack.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LouCareHack.Infrastructure.Repository;

public class CaseAssignementRepository(LouCareDbContext context) : ICaseAssignment
{
    private readonly LouCareDbContext _context = context;

    public async Task<CaseAssignment?> GetDetailByIdAsync(Guid id) =>
        await _context.CaseAssignments
            .Include(x => x.Case)
            .Include(x => x.Unit)
            .FirstOrDefaultAsync(x => x.CaseId == id);

    public IQueryable<CaseAssignment> GetListAsync() => _context.CaseAssignments;


    public async Task<bool> GetCaseAssignmentByCaseIdAsync(Guid caseId)
    {
        var result = await _context.CaseAssignments
        .Where(x => x.CaseId == caseId)
        .FirstOrDefaultAsync();

        if (result is null) return false;

        return true;
    }
       
    public async Task<CaseAssignment> SaveAsync(CaseAssignment entity, CancellationToken cancellationToken = default)
    {
        _context.CaseAssignments.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity;
    }

    public async Task UpdateAsync(CaseAssignment entity, CancellationToken cancellationToken = default)
    {
        _context.CaseAssignments.Update(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
