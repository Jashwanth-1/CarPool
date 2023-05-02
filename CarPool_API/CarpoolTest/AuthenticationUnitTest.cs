using Microsoft.Identity.Client;
using System.Text.RegularExpressions;
using ViewModel;
using Services;
using Xunit.Sdk;
using Models;
using Services.Extensions;

namespace CarpoolTest
{
    [TestClass]
    public class AuthenticationUnitTest

    {
        IUserService userService;
        public AuthenticationUnitTest(IUserService userService)
        {
            this.userService = userService;

        }
        [TestMethod]
        public void Signup_WithInvalidEmailOrPassword_False()
        {
            UserView user = new UserView();
            user.EmailId = "abc";
            user.Password = null;

            var result = userService.IsValidSignup (user);
            Assert.IsFalse(result);
        }

        [TestMethod]
        public void Signup_WithvalidEmailANDPassword_False()
        {
            UserView user = new UserView();
            user.EmailId = "abc@gmail.com";
            user.Password = "Jash12";
            user.FirstName = "abc";
            user.LastName = "abc";
            user.MobileNumber = "984576";
            var result = userService.IsValidSignup(user);
            Assert.IsTrue(result);
        }

        [TestMethod]
        public void Login_IfUserExists_FalseWrongUser()
        {
            string email = "abc@gmail.com";
            string password = "string";
            var result = userService.IsValidLogin(email, password.EncryptString());
            Assert.IsTrue(result);
        }

        [TestMethod]
        public void Login_IfUserExists_TrueRightUser()
        {
            string email = "nitin@gmail.com";
            string password = "string";
            var result = userService.IsValidLogin(email, password.EncryptString());
            Assert.IsTrue(result);
        }

        /*public bool IsValidSignup(UserView user)
        {
            string regex = @"^[^@\s]+@[^@\s]+\.(com|net|org|gov)$";
            if (Regex.IsMatch(user.EmailId!, regex, RegexOptions.IgnoreCase) && user.Password != null)
            {
                Signup(user);
                return true;
            }
            return false;
        }*/
    }
}