using LouCareHack.Domain.Entities;
using LouCareHack.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LouCareHack.Infrastructure.Repository;

public class CaseRepository(LouCareDbContext context, ICaseAssignment caseAssignment) : ICase
{
    private readonly LouCareDbContext _context = context;

    private readonly ICaseAssignment _caseAssignment = caseAssignment;

    public async Task<Case?> GetDetailByIdAsync(Guid id) =>
        await _context.Cases
            .Include(x => x.User)
            .Include(x => x.CaseManager)
            .Include(x => x.CaseAssignments)
                .ThenInclude(x => x.Unit)
            .Include(x => x.CaseStatus).FirstOrDefaultAsync(x => x.Id == id);

    public IQueryable<Case> GetListAsync() => _context.Cases;

    public async Task<Case> SaveAsync(Case entity, CancellationToken cancellationToken = default)
    {
        _context.Cases.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity;
    }

    public async Task<bool> GetCaseAssignmentStatus(Guid caseId)
    {
        //var caseAssignment = await _caseAssignment.GetCaseAssignmentByCaseIdAsync(caseId);
        return true;
    }

    public async Task UpdateAsync(Case entity, CancellationToken cancellationToken = default)
    {
        _context.Cases.Update(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
