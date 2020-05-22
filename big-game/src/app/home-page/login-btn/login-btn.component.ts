import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-login-btn',
  templateUrl: './login-btn.component.html',
  styleUrls: ['./login-btn.component.css']
})
export class LoginBtnComponent implements OnInit {

  constructor(private router: Router,
    private userService: UserDataService) {}
  
  ngOnInit(): void {
  }
  
  logIn(form: NgForm) {
    //this.router.navigate(['horse-page/:id'])
    this.userService.logInUser(form).subscribe(res => {
        console.log(JSON.stringify(res));
    })
  }

}
