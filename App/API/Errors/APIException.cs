namespace API.Errors
{

    public class APIException
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
        public APIException(int statusCode, string message = null, string details = null)
        {
            Details = details;
            Message = message;
            StatusCode = statusCode;

        }
    }
}