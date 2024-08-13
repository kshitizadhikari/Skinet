using Api.RequestHelpers;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        protected async Task<ActionResult> CreatePagedResult<T>(IBaseRepository<T> repo, ISpecification<T> spec, int PageIndex, int PageSize) where T : BaseEntity
        {
            var items = await repo.GetWithSpec(spec);
            var count = await repo.CountAsync(spec);
            var pagination = new Pagination<T>(PageIndex, PageSize, count, items);
            return Ok(pagination);
        }
    }
}
