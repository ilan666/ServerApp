using System;

namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateTime dateOfBirth)
        {
            var age = DateTime.Now.Year - dateOfBirth.Year;
            if(dateOfBirth.AddYears(age) > DateTime.Today){
                age--;
            }

            return age;
        }
    }
}