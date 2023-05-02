using ViewModel;

namespace Services
{
    public interface IUserService
    {
        public bool IsValidLogin(string emailId, string password);
        public bool IsValidSignup(UserView user); 
        public void UpdateUser(UserView user);

    }
}