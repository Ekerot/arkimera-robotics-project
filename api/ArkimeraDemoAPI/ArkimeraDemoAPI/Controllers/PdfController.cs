using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace ArkimeraDemoAPI.Controllers
{
    [Route("[controller]")]
    public class PdfController : Controller
    {
        [HttpGet("/pdf")]
        public JsonResult Get()
        {
            return new JsonResult(new { answer = "pong" });
        }

        //https://docs.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads
        [HttpPost("/upload-pdf")]
        public async Task<IActionResult> Post(List<IFormFile> files)
        {
            long size = files.Sum(f => f.Length);

            // full path to file in temp location
            var filePath = Path.GetTempFileName();
            foreach (var formFile in files)
            {
                Console.WriteLine(formFile.ToString());
                if (formFile.Length > 0)
                {
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await formFile.CopyToAsync(stream);
                    }
                }
            }

            // process uploaded files
            // Don't rely on or trust the FileName property without validation.

            return Ok(new { count = files.Count, size, filePath});
        }
    }
}