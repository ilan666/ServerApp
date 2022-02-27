import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {}
  @Output() cancelRegister = new EventEmitter<boolean>()
  constructor(private accountService: AccountService,
              private toastr: ToastrService,
              private fb: FormBuilder) { }

  registerForm: FormGroup;
  maxDate: Date


  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date()
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  register(){
    // this.accountService.register(this.model).subscribe({
    //   next: (data) => {
    //     console.log(data)
    //     this.cancel()
    //     this.toastr.success("Successfuly registered!")
    //   },
    //   error: (err) => {console.log(err);
    //                   this.toastr.error(err.error)}
    // })

    console.log(this.registerForm.value);

  }

  cancel(){
    this.cancelRegister.emit(false)
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      username: ["", Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      gender: ['Male'],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    })

    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlValue = control.value;
      const controlToMatch = (control?.parent as FormGroup)?.controls[matchTo];
      const controlToMatchValue = controlToMatch?.value;
      return controlValue === controlToMatchValue ? null : { isMatching: true };
    }
  }

}
