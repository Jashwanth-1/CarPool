using AutoMapper;
using Models;
using Services.Extensions;
using ViewModel;

namespace Services
{
    public class UserService : IUserService
    {
        private CarpoolDBContext _carContext;
        private IMapper _mapper;
        public static int UserId { get; set; }
        public UserService(CarpoolDBContext context, IMapper mapper)
        {
            this._carContext = context;
            this._mapper = mapper;
        }

        public bool IsValidLogin(string emailId, string password)
        {
            try
            {
                User data = _carContext.Users.Where(u => u.EmailId == emailId).FirstOrDefault()!;
                if(data!=null && data.EmailId != null)
                {
                    if (data.EmailId == emailId && data.Password!.DecryptString() == password)
                    {
                        UserService.UserId = data.UserId;
                        return true;
                    }
                }
                return false;
            }
            catch
            {
                return false;
            }
        }
        public bool IsValidSignup(UserView user)
        {
            if(user!=null && user.EmailId!=null && user.Password!=null)
            {
                bool isUserRegistered = _carContext.Users.Any(u => user.EmailId == u.EmailId);
                if (!isUserRegistered)
                {
                    Signup(user);
                    return true;
                }
            }
            return false;
        }

        public void Signup(UserView user)
        {
            user.Password = user.Password!.EncryptString();
            var User = _mapper.Map<User>(user);
            _carContext.Add(User);
            _carContext.SaveChanges();
        }

        public void UpdateUser(UserView user)
        {
            user.Password = user.Password!.EncryptString();
            User newUser = _mapper.Map<User>(user);
            _carContext.Update(newUser);
            _carContext.SaveChanges();
        }
    }
}
