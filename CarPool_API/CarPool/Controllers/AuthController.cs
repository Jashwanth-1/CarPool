using Microsoft.AspNetCore.Mvc;
using Services;
using ViewModel;

namespace CarPool.Controllers
{
    [ApiController]
    [Route("Api/Auth")]
    public class AuthController : ControllerBase
    {
        private IUserService _userService;
        private ITokenService _tokenService;
        public AuthController(IUserService userService, ITokenService tokenService)
        {
            this._userService= userService;
            this._tokenService= tokenService;
        }
        [HttpPost]
        [Route("SignUp")]
        public IActionResult SignUp(UserView signup)
        {
            ResponseBase<UserView> response = new ResponseBase<UserView>();
            try
            {
                if (_userService.IsValidSignup(signup))
                {
                    response.Data = signup; 
                    response.Success = "true";
                    return Ok(response);
                }
                response.Success = "true";
                response.ErrorMessage = "User Already exists";
                return BadRequest(response);
            }
            catch(Exception ex)
            {
                response.Success = "false";
                response.ErrorMessage= ex.Message;
                return BadRequest(response);  
            }
            
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login(UserView user)
        {
            ResponseBase<string> response = new ResponseBase<string>();
            try
            {
                if (_userService.IsValidLogin(user.EmailId!, user.Password!))
                {
                    response.Data = _tokenService.GenerateJwtToken(user);
                    response.Success = "true";
                    return Ok(response);
                }
                response.Success = "true";
                /*No user registered with given credentials*/
                response.ErrorMessage = "No User Found";
                return NotFound(response);

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
