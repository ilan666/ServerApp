using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DataAccess;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseAPIController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        public UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _mapper = mapper;
            _userRepository = userRepository;

        }
        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDTO updateDTO)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _userRepository.GetUserByUsernameAsync(username);

            _mapper.Map(updateDTO, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Falied to update user");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
        {
            var rtn = await _userRepository.GetMembersAsync();
            return Ok(rtn);
        }

        [HttpGet("{username}", Name = "GetUser")]
        public async Task<ActionResult<MemberDTO>> GetUser(string username)
        {
            return Ok(await _userRepository.GetMemberAsync(username));
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDTO>> AddPhoto(IFormFile file)
        {
            var username = User.GetUsername();

            var user = await _userRepository.GetUserByUsernameAsync(username);

            var result = await _photoService.UploadPhotoAsync(file);

            if(result.Error != null){
                return BadRequest(result.Error.Message);
            }

            var photo = new Photo{
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            photo.IsMain = user.Photos.Count() == 0;

            user.Photos.Add(photo);

            if(await _userRepository.SaveAllAsync())
            {

                return CreatedAtRoute("GetUser", new {username = user.UserName}, _mapper.Map<PhotoDTO>(photo));
                // return _mapper.Map<PhotoDTO>(photo);
            }

            return BadRequest("An error occured while trying uploading photo...");
        }
    
        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoID)
        {
            var username = User.GetUsername();
            var user = await _userRepository.GetUserByUsernameAsync(username);
            var photo = user.Photos.FirstOrDefault(x => x.Id == photoID);
            if(photo.IsMain)
            {
                return BadRequest("This photo is already a main photo");
            }

            var currentMainPhoto = user.Photos.FirstOrDefault(x => x.IsMain);
            if(currentMainPhoto != null) currentMainPhoto.IsMain = false;
            photo.IsMain = true;

            if(await _userRepository.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Failed to set photo to main");
        }
    
        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoID)
        {
            var username = User.GetUsername();
            var user = await _userRepository.GetUserByUsernameAsync(username);

            var photo = user.Photos.FirstOrDefault(p => p.Id == photoID);
            if(photo == null) return BadRequest("Photo does not exist!");
            if(photo.IsMain) return BadRequest("You can't delete the main photo! Replace the main photo with another photo");
            if(photo.PublicId != null){
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);

                if(result.Error != null) return BadRequest(result.Error.Message);
            }

            user.Photos.Remove(photo);

            if(await _userRepository.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Failed to delete photo");
        }
    }
}