namespace LouCareHack.API.Application.Helpers.Pagination;

public class PagedResult<T> : PagedResultBase where T : class
{
    public T[] Results { get; set; }
}
