using Asp.Versioning;
using LouCareHack.API.Application.Helpers.Pagination;
using LouCareHack.Application.Wrappers;
using LouCareHack.Domain.Entities;
using LouCareHack.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LouCareHack.API.Controllers.v1
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    public class CaseController(ICase caseService) : ControllerBase
    {
        private readonly ICase _caseService = caseService;

        [HttpGet("admin/list")]
        public async Task<IActionResult> GetListAsync(int page = 1, int pageSize = 10)
        {
            var result = _caseService.GetListAsync();

            var rtn = await PagedList<Case>.CreateAsync(result, page, pageSize);

            var res = new Response<PagedList<Case>>(rtn);
            return Ok(res);
        }

        [HttpGet("admin/detail")]
        public async Task<IActionResult> GetDetailByIdAsync(Guid id)
        {
            var result = await _caseService.GetDetailByIdAsync(id);

            if (result is null)
                return BadRequest(result);

            var res = new Response<Case>(result);

            return Ok(res);
        }
    }
}
