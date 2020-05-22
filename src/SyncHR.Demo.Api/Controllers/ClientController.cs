using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SyncHR.Demo.API.Models;
using SyncHR.Demo.DataAccess;

namespace SyncHR.Demo.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly SyncHRDemoContext _context;
        private readonly IMapper _mapper;

        public ClientController(ILogger<ClientController> logger, SyncHRDemoContext context, IMapper mapper)
        {
            _logger = logger ?? throw new System.ArgumentNullException(nameof(logger));
            _context = context ?? throw new System.ArgumentNullException(nameof(context));
            _mapper = mapper ?? throw new System.ArgumentNullException(nameof(mapper));
        }

        [HttpGet]
        public IActionResult Get()
        {
            var query = _context.Clients;
            var models = _mapper.Map<IEnumerable<ClientModel>>(query);

            if (models.Any())
            {
                return Ok(models);
            }
            return NoContent();
        }

        [HttpGet("search")]
        public IActionResult Find(string searchText, int page)
        {
            var query = _context.Clients
                                .Where(c => c.Name.StartsWith(searchText))
                                .Take(page)
                                .OrderBy(c => c.Name)
                                .AsEnumerable();

            var models = _mapper.Map<IEnumerable<ClientModel>>(query);

            if (models.Any())
            {
                return Ok(models);
            }
            return NoContent();
        }
    }
}
