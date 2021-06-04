using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactClientBookWithMVC_API.Contracts;
using ReactClientBookWithMVC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactClientBookWithMVC_API.Server.Controllers.Books
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly IMapper _mapper;

        public BooksController(IBookRepository bookRepository,
            IMapper mapper)
        {
            _bookRepository = bookRepository;
            _mapper = mapper;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            try
            {
                return Ok(await _bookRepository.GetAll());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

        // GET: api/Books/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            try
            {
                var book = await _bookRepository.GetById(id);

                if (book == null)
                {
                    return NotFound($"Book with Id = {id} not found.");
                }

                return book;
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }

        }

        // PUT: api/Books/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Book>> PutBook(int id, Book book)
        {
            try
            {
                if (id != book.BookID)
                {
                    return BadRequest();
                }

                var bookToUpdate = await _bookRepository.GetById(id);

                if (bookToUpdate == null)
                {
                    return NotFound($"Book with Id = {id} not found.");
                }

                _mapper.Map(book, bookToUpdate);

                return await _bookRepository.UpdateEntity(bookToUpdate);

            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data.");
            }


        }

        // POST: api/Books
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            try
            {
                if (book == null)
                {
                    return BadRequest("Invalid input");
                }

                var createdBook = await _bookRepository.AddEntity(book);

                return CreatedAtAction(nameof(GetBook), new { id = createdBook.BookID }, createdBook);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating data.");
            }

        }

        // DELETE: api/Books/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Book>> DeleteBook(int id)
        {
            try
            {
                var book = await _bookRepository.GetById(id);

                if (book == null)
                {
                    return NotFound($"Book with Id = {id} not found.");
                }

                return await _bookRepository.DeleteEntity(id);

            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data.");
            }

        }


        // GET: api/Books/search/search
        [HttpGet("search/{search}")]
        public async Task<ActionResult<IEnumerable<Book>>> Search(string search)
        {
            try
            {
                return Ok(await _bookRepository.Search(search));
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }
    }
}
