using ReactClientBookWithMVC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactClientBookWithMVC_API.Contracts
{
    public interface IBookAuthorRepository : IBaseRepository<BookAuthor>
    {
        Task<BookAuthor> GetById(int idOfAuthor, int idOfBook);
        Task<BookAuthor> DeleteEntity(int idOfAuthor, int idOfBook);
    }
}
