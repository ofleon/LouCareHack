namespace LouCareHack.API.Application.DTOs;

public partial class CaseDTO
{
    public Guid Id { get; set; }

    public int CaseNumber { get; set; }

    public Guid UserId { get; set; }

    public Guid? CaseManagerId { get; set; }

    public string CaseManagerName { get; set; }

    public Guid CaseStatusId { get; set; }

    public string CaseStatusName { get; set; }

    public int Priority { get; set; }

    public DateTime CaseDate { get; set; }

    public DateTime CreateAt { get; set; }

    public bool AssignedStatus { get; set; }
}