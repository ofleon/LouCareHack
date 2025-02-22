namespace LouCareHack.Domain.SeedWork;

public interface IAppLogger<T>
{
    void LogInformation(string message);
    void LogWarning(string message);
    void LogError(Exception ex, string message);
}
