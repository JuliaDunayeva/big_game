import { UserData } from 'src/app/user-data';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-form',
  templateUrl: './sign-form.component.html',
  styleUrls: ['./sign-form.component.css']
})

export class SignFormComponent implements OnInit {
  public user: UserData
  submitted = false;
  private http: HttpClient;
  
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
      "password does not match"
    }
  }
  onSubmit(){
    this.submitted = true;

  }
  }
