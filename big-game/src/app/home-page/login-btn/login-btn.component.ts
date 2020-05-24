import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserData } from 'src/app/user-data';


@Component({
  selector: 'app-login-btn',
  templateUrl: './login-btn.component.html',
  styleUrls: ['./login-btn.component.css']
})
export class LoginBtnComponent implements OnInit {

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

    this.userService.logInUser(this.logInForm).subscribe(res => {
     let result=res[0].payload.doc.get("horse1_id");
     //console.log(result);
     this.router.navigate(['horse-page/'+result])
      // this.router.navigate( res[0].payload.doc.id
    })
  }

}
