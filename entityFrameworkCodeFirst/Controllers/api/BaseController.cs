﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Sta.Data.context;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EntityFrameworkCodeFirst.Controllers.api
{
    public class BaseController : Controller
    {
        protected readonly StaDbContext _db;


        public BaseController(StaDbContext dbContext)
        {
            _db = dbContext;
        }
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
    }
}
