using Microsoft.EntityFrameworkCore;

namespace LouCareHack.API.Application.Helpers.Pagination;

public class PagedList<T>(List<T> items, int count, int pageNumber, int pageSize)
{
    public List<T> Items { get; set; } = items;
    public int CurrentPage { get; private set; } = pageNumber;
    public int TotalPages { get; private set; } = (int)Math.Ceiling(count / (double)pageSize);
    public int PageSize { get; private set; } = pageSize;
    public int TotalCount { get; private set; } = count;

    public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
    {
        var count = await source.CountAsync();
        var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
        return new PagedList<T>(items, count, pageNumber, pageSize);
    }

    public static async Task<PagedList<T>> CreateEnumAsync(IAsyncEnumerable<T> source, int pageNumber, int pageSize)
    {
        var items = new List<T>();
        var count = 0;

        // Create an enumerator to iterate over the async enumerable

        await foreach (var item in source)
        {
            count++; // Count all items
            var skipCount = (pageNumber - 1) * pageSize;

            // Only add items that fall within the current page
            if (count > skipCount && items.Count < pageSize)
            {
                items.Add(item);
            }
        }

        // Return paged list with items and count
        return new PagedList<T>(items, count, pageNumber, pageSize);
    }
}
