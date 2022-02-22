import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from '../models/member';
import { User } from '../models/User';
import { AccountService } from '../services/account.service';
import { MembersService } from '../services/members.service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  member: Member;
  user!: User;
  @ViewChild('editForm') editForm: NgForm
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue = true
    }
  }

  constructor(private accountService: AccountService, private memberService: MembersService, private toastr: ToastrService)
  {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {this.user = user as User})
   }

  ngOnInit() {
    this.loadMember()
  }

  loadMember(){
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member})
  }

  updateMember(){
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success("Your changes has been saved!")
      this.editForm.reset(this.member)
    })
  }

}
