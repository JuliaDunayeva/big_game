import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserData } from 'src/app/user-data';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-form',
  templateUrl: './sign-form.component.html',
  styleUrls: ['./sign-form.component.css'],
})
export class SignFormComponent implements OnInit {
  signForm: FormGroup;
  //   public user: UserData
  submitted = false;
  //   private http: HttpClient;
  contactForm: FormGroup;

  constructor() {
    this.signForm = this.signUpForm();
  }

  ngOnInit(): void {}
  
  signUpForm(): FormGroup {
    return new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          Validators.minLength(4),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
        confirmpassword: new FormControl(null, [Validators.required]),
      }),
    });
  }
  
  onSubmit() {
    // console.log(this.signForm)
  }
  
}
