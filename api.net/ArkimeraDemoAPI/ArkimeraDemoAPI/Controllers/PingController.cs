using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ArkimeraDemoAPI.Controllers
{
    [Route("[controller]")]
    public class PingController : Controller
    {
        [HttpGet()]
        public JsonResult Get()
        {
            return new JsonResult(new { answer = "pong" });
        }
    }
}
