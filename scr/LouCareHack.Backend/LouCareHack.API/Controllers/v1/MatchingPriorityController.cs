using Asp.Versioning;
using LouCareHack.API.Application.DTOs;
using LouCareHack.API.Application.Helpers.Pagination;
using LouCareHack.API.Application.Mappings;
using LouCareHack.Application.Wrappers;
using LouCareHack.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LouCareHack.API.Controllers.v1;

[Route("api/[controller]")]
[ApiController]
[ApiVersion("1.0")]
public class MatchingPriorityController(ICase caseService, ICaseAssignment caseAssignment) : ControllerBase
{
    private readonly ICase _caseService = caseService;
    private readonly ICaseAssignment _caseAssignment = caseAssignment;

    [HttpGet("admin/matchingpriority")]
    public async Task<IActionResult> GetListAsync(int page = 1, int pageSize = 10)
    {
        var result = _caseService.GetListAsync();

        var resultquery = result.Select(x => CaseMapHelper.MapCaseDTO(x, _caseAssignment));

        var rtn = await PagedList<CaseDTO>.CreateAsync(resultquery, page, pageSize);

        var res = new Response<PagedList<CaseDTO>>(rtn);
        return Ok(res);
    }
}