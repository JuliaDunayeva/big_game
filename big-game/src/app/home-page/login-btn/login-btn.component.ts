import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { UserDataService } from 'src/app/services/user-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-btn',
  templateUrl: './login-btn.component.html',
  styleUrls: ['./login-btn.component.css']
})
export class LoginBtnComponent implements OnInit {
  horseids:string[];
  
  constructor(private router: Router,
    private form: FormBuilder,
    private userService: UserDataService,private authService:AuthService) {}
  
    logInForm= this.form.group({
      email: [ null, [ Validators.required, Validators.minLength(8) ] ],
      password: [ null, [ Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-zd$@$!%*?&].{8,}') ]],
    });

   ngOnInit(): void {
    }
  
   logIn() {
    this.userService.logInUser(this.logInForm).subscribe(res => {
     this.authService.setUid(res[0].payload.doc.id)
     this.router.navigate(['horse-list'])
    })
  }
}
