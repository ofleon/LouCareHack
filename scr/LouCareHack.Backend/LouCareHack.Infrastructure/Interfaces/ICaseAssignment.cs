using LouCareHack.Domain.Entities;
using LouCareHack.Domain.SeedWork;

namespace LouCareHack.Infrastructure.Interfaces;

public interface ICaseAssignment : IRepository<CaseAssignment>
{
    Task<bool> GetCaseAssignmentByCaseIdAsync(Guid caseId);
}
