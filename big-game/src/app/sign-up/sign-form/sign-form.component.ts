import { User } from './../../user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-form',
  templateUrl: './sign-form.component.html',
  styleUrls: ['./sign-form.component.css']
})
export class SignFormComponent implements OnInit {
  public user: User
  submitted = false;
  
  constructor() { }

  ngOnInit(): void {
    this.user = {
      userName: '',
      email: '',
      password: '',
      confirmPassword: ''
}
  }
  onWrite(){
    if(this.user.password === this.user.confirmPassword){
      return null
    }else{ 
      "password dose not match"
    }
  }
  onSubmit(){
    this.submitted = true;

  }
  }
