using LouCareHack.Infrastructure.Interfaces;
using LouCareHack.Infrastructure.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LouCareHack.Infrastructure;

public static class ServiceExtensions
{
    public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<LouCareDbContext>(options =>
            options.UseNpgsql(configuration["ConnectionStrings:LoucareHackConnection"],
            b =>
            {
                b.MigrationsAssembly(typeof(LouCareDbContext).Assembly.FullName);
                b.EnableRetryOnFailure();
            }),
            ServiceLifetime.Scoped);

        services.AddScoped<IApplicant, ApplicantRepository>();
        services.AddScoped<ICase, CaseRepository>();
        services.AddScoped<ICaseAssignment, CaseAssignementRepository>();
        services.AddScoped<ICaseManager, CaseManagerRepository>();
        services.AddScoped<ICaseStatus, CaseStatusRepository>();
        services.AddScoped<IContact, ContactRepository>();
        services.AddScoped<IHealthCondition, HealthConditionRepository>();
        services.AddScoped<IRole, RoleRepository>();
        services.AddScoped<IUnit, UnitRepository>();
        services.AddScoped<IUser, UserRepository>();
    }
}
