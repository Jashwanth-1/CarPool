using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string? EmailId { get; set; }
        public string? Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? MobileNumber { get; set; }

    }
}
