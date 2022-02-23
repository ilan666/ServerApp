import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false
  users: any
  constructor(private http: HttpClient, private memberService: MembersService) {
   }

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle(){
    this.registerMode = !this.registerMode
  }

  getUsers(){
    this.memberService.getMembers().subscribe({
      next: (users) => {this.users = users},
      error: (err) => {console.log(err);}
    })
  }

  cancelRegisterMode($event: boolean){
    this.registerMode = $event
  }
}
