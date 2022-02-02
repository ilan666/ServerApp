import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {}
  currentUser$: Observable<User | null>
  constructor(private accountService: AccountService,
              private router: Router,
              private toastr: ToastrService) {
    this.currentUser$ = this.accountService.currentUser$
   }

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next: (response) => {console.log(response);
                          this.router.navigateByUrl("/members");
                          this.toastr.success("Logged in")}
    })
  }

  logout(){
    this.accountService.logout()
    this.router.navigateByUrl("/")
  }

}
