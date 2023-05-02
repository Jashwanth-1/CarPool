
namespace ViewModel
{
    public class ResponseBase<T>
    {
        public string? Success { get; set; }
        public string? ErrorMessage { get; set; }
        public T? Data { get; set; }
    }
}
