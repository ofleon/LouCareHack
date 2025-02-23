using LouCareHack.Domain.Entities;
using LouCareHack.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LouCareHack.Infrastructure.Repository;

public class UserRepository(LouCareDbContext context) : IUser
{
    private readonly LouCareDbContext _context = context;

    public async Task<User?> GetDetailByIdAsync(Guid id) =>
        await _context.Users
        .Include(x => x.Role)
        .FirstOrDefaultAsync(x => x.Id == id);

    public IQueryable<User> GetListAsync() =>
        _context.Users
            .Include(x => x.Role);

    public async Task<User> SaveAsync(User entity, CancellationToken cancellationToken = default)
    {
        _context.Users.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity;
    }

    public async Task UpdateAsync(User entity, CancellationToken cancellationToken = default)
    {
        _context.Users.Update(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
