import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../models/member';
import { FileUploader } from 'ng2-file-upload';
import { User } from '../../models/User';
import { AccountService } from '../../services/account.service';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Photo } from '../../models/photo';
import { MembersService } from '../../services/members.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() member: Member
  uploader: FileUploader;
  hasBaseDropZoneOver:boolean = false;
  baseURL = environment.apiURL
  user:User;

  constructor(private accountService: AccountService, private memberService: MembersService, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => (this.user = user as User))
   }

  ngOnInit() {
    this.initializeUploader()
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseURL + "users/add-photo",
      authToken: `Bearer ${this.user.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    })

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response) {
        const photo = JSON.parse(response);
        this.member.photos.push(photo);

        if(photo.isMain){
          this.user.photoUrl = photo.url
          this.member.photoUrl = photo.url
          this.accountService.SetCurrentUser(this.user)
        }
      }
    }
  }

  fileOverBase(e: any){
    this.hasBaseDropZoneOver = e
  }

  setMainPhoto(photo: Photo){
    this.memberService.setMainPhoto(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url;
      this.accountService.SetCurrentUser(this.user);

      this.member.photoUrl = photo.url
      this.member.photos.forEach(p => p.isMain = p.id === photo.id)
    })
  }

  deletePhoto(photo: Photo){
    this.memberService.deletePhoto(photo.id).subscribe(() => {
      this.member.photos = this.member.photos.filter(p => p.id != photo.id)
      this.toastr.success("Photo deleted");
    })
  }
}
