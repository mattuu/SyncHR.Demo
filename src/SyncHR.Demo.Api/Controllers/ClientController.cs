using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SyncHR.Demo.DataAccess;
using SyncHR.Demo.DataAccess.Models;

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

            return Ok(models);
        }
    }
}
