using LouCareHack.API.Application.DTOs;
using LouCareHack.Domain.Entities;
using LouCareHack.Infrastructure.Interfaces;

namespace LouCareHack.API.Application.Mappings;

public class CaseMapHelper
{

    public static CaseDTO MapCaseDTO(Case cas, ICaseAssignment caseAssignment)
    {
        return new CaseDTO()
        {
            Id = cas.Id,
            CaseNumber = cas.CaseNumber,
            UserId = cas.UserId,
            CaseManagerId = cas.CaseManagerId,
            CaseManagerName = cas.CaseManager?.FirstName,
            CaseStatusId = cas.CaseStatusId,
            CaseStatusName = cas.CaseStatus?.Name,
            Priority = cas.Priority,
            CaseDate = cas.CaseDate,
            CreateAt = cas.CreateAt,
            AssignedStatus = GetCaseAssignmentStatus(cas.Id, caseAssignment).Result
        };
        
    }

    public static async Task<bool> GetCaseAssignmentStatus(Guid caseId, ICaseAssignment caseAssignment)
    {
        var h = await caseAssignment.GetCaseAssignmentByCaseIdAsync(caseId);
        return h;
    }
}
