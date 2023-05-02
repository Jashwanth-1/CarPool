using ViewModel;

namespace Services
{
    public interface ITokenService
    {
        public string GenerateJwtToken(UserView user);
    }
}