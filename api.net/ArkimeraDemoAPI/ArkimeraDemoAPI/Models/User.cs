using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ArkimeraDemoAPI.Models
{
    public class User
    {
      public int userId { get; set; }
      public string username { get; set; }
      public string password { get; set; }
      public string apiKey { get; set; }
    }
}