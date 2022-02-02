using API.DataAccess;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class BuggyController : BaseAPIController
    {
        private readonly DataContext _context;

        public BuggyController(DataContext context)
        {
            _context = context;
        }

        // 401 UnAuthorized
        [Authorize]
        [HttpGet("auth")] // buggy/auth
        public ActionResult<string> GetSecret(){
            return  "Secret string";
        }

        // 404 Not found
        [HttpGet("not-found")] // buggy/not-found
        public ActionResult<AppUser> GetNotFound(){
            var thing = _context.Users.Find(-1);
            if (thing == null){
                return NotFound();
            }

            return Ok();
        }

        [HttpGet("server-error")] // buggy/server-error
        public ActionResult<string> GetServerError(){
            var thing = _context.Users.Find(-1);
            return thing.ToString();
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest(){
            return  BadRequest("This was not a good request");
        }
    }
}