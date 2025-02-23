using LouCareHack.API.Application.Exceptions;
using LouCareHack.Application.Settings;
using LouCareHack.Application.Wrappers;
using LouCareHack.Infrastructure.Interfaces;
using Microsoft.Extensions.Options;

namespace LouCareHack.Application.Identity;

public class AuthenticationService(IOptions<AppSettings> appSettings, IJwtTokenService jwtTokenService, IUser userService) : IAuthenticationService
{
    private readonly AppSettings _appSettings = appSettings.Value;
    private readonly IJwtTokenService _jwtTokenService = jwtTokenService;
    private readonly IUser _userService = userService;

    public async Task<Response<AuthenticationResponse>> LoginAsync(AuthenticationRequest model)
    {
        var user = await _userService.GetDetailByIdAsync(model.UserId) ?? throw new ApiException("User is null.");
        //var claveHash = PasswordHasher.ComputeHash(model.Password, user.Salt, _appSettings.HashPepper, _appSettings.HashIteration);

        if (model.Password == "hashed_password")
        {
            var authuser = new AuthenticatedUser
            {
                UserId = model.UserId,
                RolId = user.RoleId,
                RolName = user.Role.Name,
                PasswordHash = user.PasswordHash,
                Salt = user.Salt,
                IsActive = user.IsActive
            };

            var token = _jwtTokenService.GenerateToken(authuser);
            var response = new AuthenticationResponse
            {
                UserId = model.UserId,
                Token = token,
                Rol = user.Role.Name,
                Verified = true
            };

            return new Response<AuthenticationResponse>(response, $"User has been authenticated {user}");
        }
        else
        {
            throw new ApiException("User password incorrect.");
        }





        //if (user.PasswordHash != claveHash)
        //throw new ApiException("User password incorrect.");


    }
}
