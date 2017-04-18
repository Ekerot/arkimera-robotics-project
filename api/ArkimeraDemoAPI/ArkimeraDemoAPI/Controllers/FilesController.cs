using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace ArkimeraDemoAPI.Controllers
{
    [Route("companies/{companyID}/files")]
    public class FilesController : Controller
    {
        [HttpPost()]
        public async Task<IActionResult> Post(IFormFile file)
        {
            long size = file.Length;

            var filePath = Path.GetTempFileName();
            
            if (size > 0)
            {
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }

            return Ok(new { size, filePath });
        }
    }
}
