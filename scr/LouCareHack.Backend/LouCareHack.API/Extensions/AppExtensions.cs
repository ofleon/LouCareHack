using LouCareHack.API.Middlewares;

namespace LouCareHack.API.Extensions;

public static class AppExtensions
{
    public static void UseErrorHandlingMiddleware(this IApplicationBuilder app)
    {
        app.UseMiddleware<ErrorHanlderMiddleware>();
    }
}
