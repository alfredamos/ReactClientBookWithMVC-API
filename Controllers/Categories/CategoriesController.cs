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

namespace ReactClientBookWithMVC_API.Controllers.Categories
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoriesController(ICategoryRepository categoryRepository,
            IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            try
            {
                return Ok(await _categoryRepository.GetAll());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

        // GET: api/Categories/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            try
            {
                var category = await _categoryRepository.GetById(id);

                if (category == null)
                {
                    return NotFound($"Category with Id = {id} not found.");
                }

                return category;
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }

        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Category>> PutCategory(int id, Category category)
        {
            try
            {
                if (id != category.CategoryID)
                {
                    return BadRequest();
                }

                var categoryToUpdate = await _categoryRepository.GetById(id);

                if (categoryToUpdate == null)
                {
                    return NotFound($"Category with Id = {id} not found.");
                }

                _mapper.Map(category, categoryToUpdate);

                return await _categoryRepository.UpdateEntity(categoryToUpdate);

            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data.");
            }


        }

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            try
            {
                if (category == null)
                {
                    return BadRequest("Invalid input");
                }

                var createdCategory = await _categoryRepository.AddEntity(category);

                return CreatedAtAction(nameof(GetCategory), new { id = createdCategory.CategoryID }, createdCategory);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating data.");
            }

        }

        // DELETE: api/Categories/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Category>> DeleteCategory(int id)
        {
            try
            {
                var category = await _categoryRepository.GetById(id);

                if (category == null)
                {
                    return NotFound($"Category with Id = {id} not found.");
                }

                return await _categoryRepository.DeleteEntity(id);

            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data.");
            }

        }


        // GET: api/Categories/search/search
        [HttpGet("search/{search}")]
        public async Task<ActionResult<IEnumerable<Category>>> Search(string search)
        {
            try
            {
                return Ok(await _categoryRepository.Search(search));
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }
    }
}
