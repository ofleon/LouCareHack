using LouCareHack.API.Middlewares;

namespace LouCareHack.API.Application.Exceptions;

public static class AppExtensions
{
    public static void UseErrorHandlingMiddleware(this IApplicationBuilder app)
    {
        app.UseMiddleware<ErrorHanlderMiddleware>();
    }
}
