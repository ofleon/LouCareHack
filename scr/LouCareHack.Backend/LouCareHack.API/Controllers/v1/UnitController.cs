using Asp.Versioning;
using LouCareHack.API.Application.DTOs;
using LouCareHack.API.Application.Helpers.Pagination;
using LouCareHack.API.Application.Mappings;
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
    public class UnitController(IUnit unitService) : ControllerBase
    {
        private readonly IUnit _unitService = unitService;

        [HttpGet("admin/list")]
        public async Task<IActionResult> GetListAsync(int page = 1, int pageSize = 10)
        {
            var result = _unitService.GetListAsync();

            var resultquery = result.Select(x => UnitMapHelper.MapUnitDTO(x));

            var rtn = await PagedList<UnitDTO>.CreateAsync(resultquery, page, pageSize);

            var res = new Response<PagedList<UnitDTO>>(rtn);
            return Ok(res);
        }

        [HttpGet("admin/detail")]
        public async Task<IActionResult> GetDetailByIdAsync(Guid id)
        {
            var result = await _unitService.GetDetailByIdAsync(id);

            if (result is null)
                return BadRequest(result);

            var res = new Response<Unit>(result);

            return Ok(res);
        }
    }
}
