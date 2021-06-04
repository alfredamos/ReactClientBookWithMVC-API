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

namespace ReactClientBookWithMVC_API.Controllers.BookAuthors
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookAuthorsController : ControllerBase
    {
        private readonly IBookAuthorRepository _bookAuthorRepository;
        private readonly IMapper _mapper;

        public BookAuthorsController(IBookAuthorRepository bookAuthorRepository,
            IMapper mapper)
        {
            _bookAuthorRepository = bookAuthorRepository;
            _mapper = mapper;
        }

        // GET: api/BookAuthors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookAuthor>>> GetBookAuthors()
        {
            try
            {
                return Ok(await _bookAuthorRepository.GetAll());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

        // GET: api/BookAuthors/5/3
        [HttpGet("{idOfAuthor:int}/{idOfBook:int}", Name = "GetBookAuthor")]
        public async Task<ActionResult<BookAuthor>> GetBookAuthor(int idOfAuthor, int idOfBook)
        {
            try
            {
                var bookAuthor = await _bookAuthorRepository.GetById(idOfAuthor, idOfBook);

                if (bookAuthor == null)
                {
                    return NotFound($"BookAuthor with Id = {idOfAuthor}, {idOfBook} not found.");
                }

                return bookAuthor;
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }

        }

        // PUT: api/BookAuthors/5/3
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{idOfAuthor:int}/{idOfBook:int}")]
        public async Task<ActionResult<BookAuthor>> PutBookAuthor(int idOfAuthor, int idOfBook, BookAuthor bookAuthor)
        {
            try
            {
                if (idOfAuthor != bookAuthor.AuthorID && idOfBook != bookAuthor.BookID)
                {
                    return BadRequest("Id mismatch");
                }

                var bookAuthorToUpdate = await _bookAuthorRepository.GetById(idOfAuthor, idOfBook);

                if (bookAuthorToUpdate == null)
                {
                    return NotFound($"BookAuthor with Id = {idOfAuthor}, {idOfBook} not found.");
                }

                _mapper.Map(bookAuthor, bookAuthorToUpdate);

                return await _bookAuthorRepository.UpdateEntity(bookAuthorToUpdate);

            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data.");
            }


        }

        // POST: api/BookAuthors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BookAuthor>> PostBookAuthor(BookAuthor bookAuthor)
        {
            try
            {
                if (bookAuthor == null)
                {
                    return BadRequest("Invalid input");
                }

                var createdBookAuthor = await _bookAuthorRepository.AddEntity(bookAuthor);

                return CreatedAtAction(nameof(GetBookAuthor), new { idOfAuthor = createdBookAuthor.AuthorID, idOfBook = createdBookAuthor.BookID}, createdBookAuthor);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating data.");
            }

        }

        // DELETE: api/BookAuthors/5/3
        [HttpDelete("{idOfAuthor:int}/{idOfBook:int}")]
        public async Task<ActionResult<BookAuthor>> DeleteBookAuthor(int idOfAuthor, int idOfBook)
        {
            try
            {
                var bookAuthor = await _bookAuthorRepository.GetById(idOfAuthor, idOfBook);

                if (bookAuthor == null)
                {
                    return NotFound($"BookAuthor with Id = {idOfAuthor}, {idOfBook} not found.");
                }

                return await _bookAuthorRepository.DeleteEntity(idOfAuthor, idOfBook);

            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data.");
            }

        }


        // GET: api/BookAuthors/search/search
        [HttpGet("search/{search}")]
        public async Task<ActionResult<IEnumerable<BookAuthor>>> Search(string search)
        {
            try
            {
                return Ok(await _bookAuthorRepository.Search(search));
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }
    }
}
