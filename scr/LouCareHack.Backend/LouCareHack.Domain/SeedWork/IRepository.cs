 namespace LouCareHack.Domain.SeedWork;

public interface IRepository<T> where T : class
{
    IQueryable<T> GetListAsync();
    Task<T?> GetDetailByIdAsync(Guid id);
    Task<T> SaveAsync(T entity, CancellationToken cancellationToken = default);
    Task UpdateAsync(T entity, CancellationToken cancellationToken = default);
}
