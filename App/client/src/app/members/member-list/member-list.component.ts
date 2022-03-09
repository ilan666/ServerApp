import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Member } from 'src/app/models/member';
import { MembersService } from '../../services/members.service';
import { Pagination } from './../../models/pagination';
import { UserParams } from '../../models/userParams';
import { AccountService } from '../../services/account.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Member[];
  pagination: Pagination
  userParams: UserParams
  user: User
  genderList = [{
    value: 'male',
    display: 'Males'
  },{
    value: 'female',
    display: 'Females'
  }]

  constructor(private memberService: MembersService, private accountService: AccountService) {
    accountService.currentUser$
    .pipe(take(1))
    .subscribe((user: any) => {
      this.user = user
      this.userParams = new UserParams(user)
    })
   }

  ngOnInit(): void {
    this.loadMembers()
  }

  loadMembers(){
    this.memberService.getMembers(this.userParams).subscribe((res) => {
      this.members = res.result
      this.pagination = res.pagination
    })
  }

  pageChanged({ page }: any){
    this.userParams.pageNumber = page;
    this.loadMembers()
  }

  resetFilters(){
    this.userParams = new UserParams(this.user)
    this.loadMembers()
  }
}
