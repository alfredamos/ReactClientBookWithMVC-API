using Microsoft.EntityFrameworkCore;
using ReactClientBookWithMVC_API.Contracts;
using ReactClientBookWithMVC_API.Data;
using ReactClientBookWithMVC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;

namespace ReactClientBookWithMVC_API.SQL
{
    public class SQLPublisherRepository : IPublisherRepository
    {
        private readonly ApplicationDbContext _context;
        public SQLPublisherRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Publisherr> AddEntity(Publisherr newEntity)
        {
            var publisher = await _context.Publishers.AddAsync(newEntity);
            await _context.SaveChangesAsync();

            return publisher.Entity;
        }

        public async Task<Publisherr> DeleteEntity(int id)
        {
            var publisherToDelete = await _context.Publishers.FindAsync(id);

            if (publisherToDelete != null)
            {
                _context.Publishers.Remove(publisherToDelete);
                await _context.SaveChangesAsync();

            }
            return publisherToDelete;
        }

        public async Task<IEnumerable<Publisherr>> GetAll()
        {
            return await _context.Publishers.ToListAsync();
        }

        public async Task<Publisherr> GetById(int id)
        {
            return await _context.Publishers.FindAsync(id);
        }

        public async Task<IEnumerable<Publisherr>> Search(string searchKey)
        {
            IQueryable<Publisherr> publishers = _context.Publishers;

            if (string.IsNullOrWhiteSpace(searchKey))
            {
                return await publishers.ToListAsync();
            }

            return await publishers.Where(x => x.Location.Contains(searchKey) || 
                                   x.PublisherName.Contains(searchKey)).ToListAsync();
        }

        public async Task<Publisherr> UpdateEntity(Publisherr updatedEntity)
        {
            var publisher = _context.Publishers.Attach(updatedEntity);
            publisher.State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return publisher.Entity;
        }
    }
}
