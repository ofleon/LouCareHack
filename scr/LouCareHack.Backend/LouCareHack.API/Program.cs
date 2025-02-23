using LouCareHack.Application.Identity;
using LouCareHack.Application.Settings;
using LouCareHack.Application.Wrappers;
using LouCareHack.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Reflection;
using System.Text;

using FluentValidation;
using LouCareHack.API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddApiVersioningExtension();
builder.Services.AddSwaggerGenExtension();


builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();

builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("JWTSettings"));
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = false;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        RequireExpirationTime = true,
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,
        ValidIssuer = builder.Configuration["JWTSettings:Issuer"],
        ValidAudience = builder.Configuration["JWTSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWTSettings:Secret"]!))
    };

    options.Events = new JwtBearerEvents()
    {
        OnAuthenticationFailed = c =>
        {
            c.NoResult();
            c.Response.StatusCode = 500;
            c.Response.ContentType = "text/plain";
            return c.Response.WriteAsync(c.Exception.ToString());
        },
        OnChallenge = context =>
        {
            context.HandleResponse();
            context.Response.StatusCode = 401;
            context.Response.ContentType = "application/json";
            var result = JsonConvert.SerializeObject(new Response<string>("User not authorized"));
            return context.Response.WriteAsync(result);
        },
        OnForbidden = context =>
        {
            context.Response.StatusCode = 400;
            context.Response.ContentType = "application/json";
            var result = JsonConvert.SerializeObject(new Response<string>("User does not has permission"));
            return context.Response.WriteAsync(result);
        },
    };
});

builder.Services.AddAuthorization();

builder.Services.AddCors(builder =>
{
    builder.AddDefaultPolicy(options =>
    {
        options.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin()
        .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseErrorHandlingMiddleware();

app.MapControllers();

app.Run();
