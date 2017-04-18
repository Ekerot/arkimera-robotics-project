using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ArkimeraDemoAPI.Models
{
    public class Response
    {
      public string status { get; set; }
      public string message { get; set; }
    }
}