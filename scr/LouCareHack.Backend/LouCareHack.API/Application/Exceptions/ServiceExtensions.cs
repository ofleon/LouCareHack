using Asp.Versioning;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

namespace LouCareHack.API.Application.Exceptions;

public static class ServiceExtensions
{
    public static void AddApiVersioningExtension(this IServiceCollection services)
    {
        services.AddApiVersioning(config =>
        {
            config.DefaultApiVersion = new ApiVersion(1, 0);
            config.AssumeDefaultVersionWhenUnspecified = true;
            config.ReportApiVersions = true;
            config.ApiVersionReader = ApiVersionReader.Combine(
                new QueryStringApiVersionReader("api-version"),
                new HeaderApiVersionReader("X-version"),
                new MediaTypeApiVersionReader("ver"));
        })
        .AddApiExplorer(config =>
        {
            config.GroupNameFormat = "'v'VVV";
            config.SubstituteApiVersionInUrl = true;
        });
    }

    public static void AddSwaggerGenExtension(this IServiceCollection services)
    {
        services.AddSwaggerGen(opt =>
        {

            opt.SwaggerDoc("v1", new OpenApiInfo { Title = "RCLReservas API", Version = "v1" });

            var securityDef = new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                Scheme = JwtBearerDefaults.AuthenticationScheme,
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = "RCL Reservas JWT Authentication Header"
            };

            opt.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, securityDef);

            opt.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = JwtBearerDefaults.AuthenticationScheme
                        }
                    }, Array.Empty<string>()
                }
            });
        });
    }
}
