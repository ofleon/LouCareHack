using LouCareHack.Domain.Entities;
using LouCareHack.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LouCareHack.Infrastructure.Repository;

public class ApplicantRepository(LouCareDbContext context) : IApplicant
{
    private readonly LouCareDbContext _context = context;

    public async Task<Applicant?> GetDetailByIdAsync(Guid id) =>
        await _context.Applicants
        .Include(x => x.User)
        .Include(x => x.User)
        .Include(x => x.Condition)
        .FirstOrDefaultAsync(x => x.UserId == id);

    public IQueryable<Applicant> GetListAsync() =>
        _context.Applicants
            .Include(x => x.Condition);

    public async Task<Applicant> SaveAsync(Applicant entity, CancellationToken cancellationToken = default)
    {
        _context.Applicants.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity;
    }

    public async Task UpdateAsync(Applicant entity, CancellationToken cancellationToken = default)
    {
        _context.Applicants.Update(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
