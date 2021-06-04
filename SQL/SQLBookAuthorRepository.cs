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
    public class SQLBookAuthorRepository : IBookAuthorRepository
    {
        private readonly ApplicationDbContext _context;

        public SQLBookAuthorRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<BookAuthor> AddEntity(BookAuthor newEntity)
        {
            var bookAuthor = await _context.BookAuthors.AddAsync(newEntity);
            await _context.SaveChangesAsync();

            return bookAuthor.Entity;
        }

        public async Task<BookAuthor> DeleteEntity(int id)
        {
            var bookAuthorToDelete = await _context.BookAuthors.FindAsync(id);

            if (bookAuthorToDelete != null)
            {
                _context.BookAuthors.Remove(bookAuthorToDelete);
                await _context.SaveChangesAsync();

            }
            return bookAuthorToDelete;
        }

        public async Task<BookAuthor> DeleteEntity(int idOfAuthor, int idOfBook)
        {
            var bookAuthorToDelete = await _context.BookAuthors
                          .FirstOrDefaultAsync(x => x.AuthorID == idOfAuthor && x.BookID == idOfBook);

            if (bookAuthorToDelete != null)
            {
                _context.BookAuthors.Remove(bookAuthorToDelete);
                await _context.SaveChangesAsync();

            }
            return bookAuthorToDelete;
        }

        public async Task<IEnumerable<BookAuthor>> GetAll()
        {
            return await _context.BookAuthors.Include(x => x.Author)
                         .Include(x => x.Book).ToListAsync();
        }

        public async Task<BookAuthor> GetById(int id)
        {
            return await _context.BookAuthors.Include(x => x.Author)
                         .Include(x => x.Book)
                         .FirstOrDefaultAsync(x => x.AuthorID == id);
        }

        public async Task<BookAuthor> GetById(int idOfAuthor, int idOfBook)
        {
            return await _context.BookAuthors.Include(x => x.Author)
                          .Include(x => x.Book)
                          .FirstOrDefaultAsync(x => x.AuthorID == idOfAuthor && x.BookID == idOfBook);
        }

        public async Task<IEnumerable<BookAuthor>> Search(string searchKey)
        {
            IQueryable<BookAuthor> bookAuthors = _context.BookAuthors;

            if (string.IsNullOrWhiteSpace(searchKey))
            {
                return await bookAuthors.Include(x => x.Author)
                         .Include(x => x.Book).ToListAsync();
            }

            return await bookAuthors.Include(x => x.Author)
                         .Include(x => x.Book).Where(x => x.Author.FirstName.Contains(searchKey) ||
                          x.Author.FullName.Contains(searchKey) || x.Author.LastName.Contains(searchKey) ||
                          x.Author.Location.Contains(searchKey) || x.Book.ISBN.Contains(searchKey) ||
                          x.Book.Title.Contains(searchKey) || x.Book.Category.CategoryName.Contains(searchKey)).ToListAsync();
        }

        public async Task<BookAuthor> UpdateEntity(BookAuthor updatedEntity)
        {
            var bookAuthor = _context.BookAuthors.Attach(updatedEntity);
            bookAuthor.State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return bookAuthor.Entity;
        }
    }
}
