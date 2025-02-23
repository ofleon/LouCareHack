using LouCareHack.API.Application.DTOs;
using LouCareHack.Domain.Entities;
using LouCareHack.Infrastructure.Interfaces;

namespace LouCareHack.API.Application.Mappings;

public class CaseMapHelper(ICaseAssignment caseAssignment)
{
    private readonly ICaseAssignment _caseAssignment = caseAssignment;

    public static CaseDTO MapCaseDTO(Case cas)
    {
        return new CaseDTO();
        
    }

    //public async Task<bool> GetCaseAssignmentStatus(Guid caseId) =>
    //    await _caseAssignment.GetCaseAssignmentStatus(caseId);

}
