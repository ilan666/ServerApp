using System.Collections.Generic;
using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.DataAccess
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if(await context.Users.AnyAsync()) return;

            var UserData = await System.IO.File.ReadAllTextAsync("DataAccess/UserSeedData.json");

            var users = System.Text.Json.JsonSerializer.Deserialize<List<AppUser>>(UserData);

            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();
                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes("Password"));
                user.PasswordSalt = hmac.Key;

                context.Users.Add(user);
            }

            await context.SaveChangesAsync();
        }
    }
}