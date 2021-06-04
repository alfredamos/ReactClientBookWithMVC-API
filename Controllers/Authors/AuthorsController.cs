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

namespace ReactClientBookWithMVC_API.Controllers.Authors
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private readonly IAuthorRepository _authorRepository;
        private readonly IMapper _mapper;

        public AuthorsController(IAuthorRepository addressRepository,
            IMapper mapper)
        {
            _authorRepository = addressRepository;
            _mapper = mapper;
        }

        // GET: api/Authors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Author>>> GetAuthors()
        {
            try
            {
                return Ok(await _authorRepository.GetAll());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

        // GET: api/Authors/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Author>> GetAuthor(int id)
        {
            try
            {
                var author = await _authorRepository.GetById(id);

                if (author == null)
                {
                    return NotFound($"Author with Id = {id} not found.");
                }

                return author;
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }

        }

        // PUT: api/Authors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Author>> PutAuthor(int id, Author author)
        {
            try
            {
                if (id != author.AuthorID)
                {
                    return BadRequest();
                }

                var authorToUpdate = await _authorRepository.GetById(id);

                if (authorToUpdate == null)
                {
                    return NotFound($"Author with Id = {id} not found.");
                }

                _mapper.Map(author, authorToUpdate);

                return await _authorRepository.UpdateEntity(authorToUpdate);

            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data.");
            }


        }

        // POST: api/Authors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Author>> PostAuthor(Author author)
        {
            try
            {
                if (author == null)
                {
                    return BadRequest("Invalid input");
                }

                var createdAuthor = await _authorRepository.AddEntity(author);

                return CreatedAtAction(nameof(GetAuthor), new { id = createdAuthor.AuthorID }, createdAuthor);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating data.");
            }

        }

        // DELETE: api/Authors/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Author>> DeleteAuthor(int id)
        {
            try
            {
                var author = await _authorRepository.GetById(id);

                if (author == null)
                {
                    return NotFound($"Author with Id = {id} not found.");
                }

                return await _authorRepository.DeleteEntity(id);

            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data.");
            }

        }


        // GET: api/Authors/search/search
        [HttpGet("search/{search}")]
        public async Task<ActionResult<IEnumerable<Author>>> Search(string search)
        {
            try
            {
                Console.WriteLine("in controller, searchKey : " + search);
                return Ok(await _authorRepository.Search(search));
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }
    }
}
