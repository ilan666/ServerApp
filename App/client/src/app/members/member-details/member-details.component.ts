import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/models/member';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  member:Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember()

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
  }

  getImages(): NgxGalleryImage[]{
    const imageURLs: NgxGalleryImage[] = [];
    for (const photo of this.member.photos){
      imageURLs.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      })
    }

    return imageURLs
  }

  loadMember(){
    const username = this.route.snapshot.paramMap.get('id') as string
    this.memberService.getMember(username).subscribe((member) => {
      this.member = member;
      this.galleryImages = this.getImages()
    })
  }
}
