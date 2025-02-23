using LouCareHack.API.Application.DTOs;
using LouCareHack.Domain.Entities;

namespace LouCareHack.API.Application.Mappings;

public class CaseMapHelper(ICaseAssignment caseAssignment)
{
    private readonly ICaseAssignment _caseAssignment = caseAssignment;
    public static CaseDTO MapCaseDTO(Case case)
    {
        return new CaseDTO
        {
            Id = case.Id,
            CaseNumber = case.CaseNumber,
            UserId = case.UserId,
            CaseManagerId = case.CaseManagerId,
            CaseStatusId = case.CaseStatusId,
            CaseStatusName = case.CaseStatus.Name,
            Priority = case.Priority,
            CaseDate = case.CaseDate,
            CreateAt = case.CreateAt,
            AssignedStatus = GetCaseAssignmentStatus(case.Id).Result
            
        };
    }
    
    public async Task<bool> GetCaseAssignmentStatus(Guid caseId) =>
        await _caseAssignment.GetCaseAssignmentStatus(caseId);
    
}
