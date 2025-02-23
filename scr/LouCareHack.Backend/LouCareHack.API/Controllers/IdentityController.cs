using LouCareHack.Application.Identity;
using LouCareHack.Domain.Entities;
using LouCareHack.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LouCareHack.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController(IAuthenticationService authenticationService, IUser userService, IApplicant applicantService, ICaseManager caseManagerService) : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService = authenticationService;
        private readonly IUser _userService = userService;
        private readonly IApplicant _applicantService = applicantService;
        private readonly ICaseManager _caseManagerService = caseManagerService;

        [HttpPost("authentication")]

        public async Task<IActionResult> AutenticacionAsync(AuthenticationRequest request)
        {
            var result = await _authenticationService.LoginAsync(request);
            return Ok(result);
        }


        //[HttpPost("register")]
        //public async Task<IActionResult> UserRegisterAsync(RegisterRequest register)
        //{
        //    var newUser = new User()
        //    {
        //        //RolId = register.RolId,
        //        RoleId = register.RoleId,
        //        Salt = PasswordHasher.GenerateSalt().TrimEnd(),
        //        IsActive = true
        //    };

        //    var result = await _userService.SaveAsync(newUser);

        //    if (result is null)
        //        return BadRequest(result);


        //    if (register.RoleId == Guid.Parse(""))
        //    {
        //        var newApplicant = new Applicant()
        //        {
        //            FirstName = register.FirstName,
        //            LastName = register.LastName,
        //            //DoB = register.DoB.Value,
        //            Email = register.Email,
        //            PhoneNumber = register.PhoneNumber,
        //            Gender = register.Gender,
        //            ConditionId = Guid.NewGuid()
        //        };



        //        var result = await _applicantService.SaveAsync(newUser);
        //    }

        //    return Ok(res);
        //}
    }
}
