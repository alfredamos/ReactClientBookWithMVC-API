using Microsoft.EntityFrameworkCore;
using ReactClientBookWithMVC_API.Contracts;
using ReactClientBookWithMVC_API.Data;
using ReactClientBookWithMVC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactClientBookWithMVC_API.SQL
{
    public class SQLAuthorRepository : IAuthorRepository
    {
        private readonly ApplicationDbContext _context;

        public SQLAuthorRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Author> AddEntity(Author newEntity)
        {
            var author = await _context.Authors.AddAsync(newEntity);
            await _context.SaveChangesAsync();

            return author.Entity;
        }

        public async Task<Author> DeleteEntity(int id)
        {
            var authorToDelete = await _context.Authors.FindAsync(id);

            if (authorToDelete != null)
            {
                _context.Authors.Remove(authorToDelete);
                await _context.SaveChangesAsync();

            }
            return authorToDelete;
        }

        public async Task<IEnumerable<Author>> GetAll()
        {
            return await _context.Authors.Include(x => x.BookAuthors).ToListAsync();
        }

        public async Task<Author> GetById(int id)
        {
            return await _context.Authors.Include(x => x.BookAuthors)
                         .FirstOrDefaultAsync(x => x.AuthorID == id);
        }

        public async Task<IEnumerable<Author>> Search(string searchKey)
        {
            
            IQueryable<Author> authors =  _context.Authors;

            if (string.IsNullOrWhiteSpace(searchKey))
            {
                Console.WriteLine("At point 1 in SQL, searchKey : " + searchKey);
                return await authors.Include(x => x.BookAuthors).ToListAsync();
            }

            Console.WriteLine("At point 2 in SQL, searchKey : " + searchKey);
            return await authors.Include(x => x.BookAuthors)
                .Where(x => x.FirstName.Contains(searchKey) ||
                          x.LastName.Contains(searchKey) ||
                          x.Location.Contains(searchKey)).ToListAsync();
        }

        public async Task<Author> UpdateEntity(Author updatedEntity)
        {
            var author = _context.Authors.Attach(updatedEntity);
            author.State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return author.Entity;
        }
    }
}
