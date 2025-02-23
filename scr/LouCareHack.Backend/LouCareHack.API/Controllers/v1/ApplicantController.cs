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
    public class ApplicantController(IApplicant applicantService) : ControllerBase
    {
        private readonly IApplicant _applicantService = applicantService;

        [HttpGet("admin/list")]
        public async Task<IActionResult> GetListAsync(int page = 1, int pageSize = 10)
        {
            var result = _applicantService.GetListAsync();

            var rtn = await PagedList<Applicant>.CreateAsync(result, page, pageSize);

            var res = new Response<PagedList<Applicant>>(rtn);
            return Ok(res);
        }

        [HttpGet("admin/detail")]
        public async Task<IActionResult> GetDetailByIdAsync(Guid id)
        {
            var result = await _applicantService.GetDetailByIdAsync(id);

            if (result is null)
                return BadRequest(result);

            var res = new Response<Applicant>(result);

            return Ok(res);
        }
    }
}
