using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Services;
using ViewModel;

namespace CarPool.Controllers
{
    [Authorize]
    [ApiController]
    [Route("Api/User")]
    public class UserController : Controller
    {
        private IUserService _userService;
        public UserController(IUserService userService)
        {
            this._userService = userService;
        }

        [HttpPost]
        [Route("Update")]
        public IActionResult UpdateUser(UserView user)
        {
            ResponseBase<UserView> response = new ResponseBase<UserView>();
            try
            {
                this._userService.UpdateUser(user);
                response.Data = user;
                response.Success = "true";
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Success = "false";
                response.ErrorMessage = ex.Message;
                return BadRequest(response);
            }
        }
    }
}
