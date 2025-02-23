using LouCareHack.Application.Wrappers;

namespace LouCareHack.Application.Identity;

public interface IAuthenticationService
{
    Task<Response<AuthenticationResponse>> LoginAsync(AuthenticationRequest model);
}
