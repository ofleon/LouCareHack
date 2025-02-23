using LouCareHack.Application.Identity;

namespace LouCareHack.Application.Identity;

public interface IJwtTokenService
{
    string GenerateToken(AuthenticatedUser user);
    int? ValidateToken(string token);
}
