using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArkimeraDemoAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace ArkimeraDemoAPI.Controllers
{
    [Route("user/[controller]")]
    public class AuthController : Controller
    {
        [HttpPost()]
        public IActionResult Authenticate([FromBody] User user) 
        {
            if (string.IsNullOrEmpty(user.username) || string.IsNullOrEmpty(user.password))
            {
                return BadRequest(new Response{
                    status = "fail",
                    message = "Missing username and/or password"
                });
            }

            if (user.username == "admin" && user.password == "admin")
            {
                var jwt = "random-string-as-jwt";
                return new JsonResult(new Response{
                        status = "success",
                        message = "Successfully logged in",
                    });
            }

            return Unauthorized();
        }
    }
}
