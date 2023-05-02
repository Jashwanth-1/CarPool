using Microsoft.IdentityModel.Tokens;
using Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ViewModel;
using Microsoft.Extensions.Configuration;
using Services.Extensions;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Services
{
    public class TokenService : ITokenService
    {
        private IConfiguration _configuration;
        private CarpoolDBContext _dbCarContext;
        public TokenService(IConfiguration _configuration, CarpoolDBContext carContext) { 

            this._configuration= _configuration;
            this._dbCarContext= carContext;
        }
        public string GenerateJwtToken(UserView user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["jwt:Key"]!);
            User currentUser = _dbCarContext.Users.Where(u => u.EmailId == user.EmailId).FirstOrDefault()!;
            string fullName = currentUser.FirstName + " " + currentUser.LastName;
            currentUser.Password = currentUser.Password!.DecryptString();
            var serializedUser = JsonConvert.SerializeObject(currentUser, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
            });
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new[] {
                 new Claim("user",value: serializedUser),
                }),
                Expires = DateTime.UtcNow.AddMinutes(15),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
