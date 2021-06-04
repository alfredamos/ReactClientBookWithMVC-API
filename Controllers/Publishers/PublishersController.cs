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

namespace ReactClientBookWithMVC_API.Controllers.Publishers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublishersController : ControllerBase
    {
        private readonly IPublisherRepository _publisherRepository;
        private readonly IMapper _mapper;

        public PublishersController(IPublisherRepository addressRepository,
            IMapper mapper)
        {
            _publisherRepository = addressRepository;
            _mapper = mapper;
        }

        // GET: api/Publishers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Publisherr>>> GetPublishers()
        {
            try
            {
                return Ok(await _publisherRepository.GetAll());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

        // GET: api/Publishers/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Publisherr>> GetPublisher(int id)
        {
            try
            {
                var publisher = await _publisherRepository.GetById(id);

                if (publisher == null)
                {
                    return NotFound($"Publisherr with Id = {id} not found.");
                }

                return publisher;
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }

        }

        // PUT: api/Publishers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Publisherr>> PutPublisher(int id, Publisherr publisher)
        {
            try
            {
                if (id != publisher.PublisherID)
                {
                    return BadRequest();
                }

                var publisherToUpdate = await _publisherRepository.GetById(id);

                if (publisherToUpdate == null)
                {
                    return NotFound($"Publisherr with Id = {id} not found.");
                }

                _mapper.Map(publisher, publisherToUpdate);

                return await _publisherRepository.UpdateEntity(publisherToUpdate);

            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data.");
            }


        }

        // POST: api/Publishers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Publisherr>> PostPublisher(Publisherr publisher)
        {
            try
            {
                if (publisher == null)
                {
                    return BadRequest("Invalid input");
                }

                var createdPublisher = await _publisherRepository.AddEntity(publisher);

                return CreatedAtAction(nameof(GetPublisher), new { id = createdPublisher.PublisherID }, createdPublisher);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating data.");
            }

        }

        // DELETE: api/Publishers/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Publisherr>> DeletePublisher(int id)
        {
            try
            {
                var publisher = await _publisherRepository.GetById(id);

                if (publisher == null)
                {
                    return NotFound($"Publisherr with Id = {id} not found.");
                }

                return await _publisherRepository.DeleteEntity(id);

            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data.");
            }

        }


        // GET: api/Publishers/search/search
        [HttpGet("search/{search}")]
        public async Task<ActionResult<IEnumerable<Publisherr>>> Search(string search)
        {
            try
            {
                return Ok(await _publisherRepository.Search(search));
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }
    }
}
