import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {}
  @Output() cancelRegister = new EventEmitter<boolean>()
  constructor(private accountService: AccountService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe({
      next: (data) => {
        console.log(data)
        this.cancel()
        this.toastr.success("Successfuly registered!")
      },
      error: (err) => {console.log(err);
                      this.toastr.error(err.error)}
    })
  }

  cancel(){
    this.cancelRegister.emit(false)
  }
}
