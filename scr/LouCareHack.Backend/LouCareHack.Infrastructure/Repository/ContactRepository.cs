using LouCareHack.Domain.Entities;
using LouCareHack.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LouCareHack.Infrastructure.Repository;

public class ContactRepository(LouCareDbContext context) : IContact
{
    private readonly LouCareDbContext _context = context;

    public async Task<Contact?> GetDetailByIdAsync(Guid id) =>
        await _context.Contacts
            .FirstOrDefaultAsync(x => x.UserId == id);

    public IQueryable<Contact> GetListAsync() =>
        _context.Contacts;

    public async Task<Contact> SaveAsync(Contact entity, CancellationToken cancellationToken = default)
    {
        _context.Contacts.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity;
    }

    public async Task UpdateAsync(Contact entity, CancellationToken cancellationToken = default)
    {
        _context.Contacts.Update(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
