import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserData } from 'src/app/user-data';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-btn',
  templateUrl: './login-btn.component.html',
  styleUrls: ['./login-btn.component.css']
})
export class LoginBtnComponent implements OnInit {
  horseids:string[];
  authService:AuthService;

  constructor(private router: Router,
    private form: FormBuilder,
    private userService: UserDataService) {}
  
    logInForm= this.form.group({
      email: [ null, [ Validators.required, Validators.minLength(8) ] ],
      password: [ null, [ Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-zd$@$!%*?&].{8,}') ]
      ],
    });
  ngOnInit(): void {
  }
  
  logIn() {
    //this.router.navigate(['horse-page/:id'])
    //let horse1_id:string;
    //horse1_id="horse1_id";
    //this.horseids=["horse1","horse2"];  
    this.userService.logInUser(this.logInForm).subscribe(res => {
      //console.log(res)
     //this.authService.setUId(res[0].payload.doc.id);
       //sessionStorage.setItem('OwnerName',res[0].payload.doc.ref.onSnapshot.('userName'));
       sessionStorage.setItem("uid", res[0].payload.doc.id);
     this.router.navigate(['horse-list']);//'+sessionStorage.getItem("UId");
    })
  }

}
