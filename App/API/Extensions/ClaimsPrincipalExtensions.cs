using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUsername(this ClaimsPrincipal username)
        {
            var user = username.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return user;
        }
    }
}