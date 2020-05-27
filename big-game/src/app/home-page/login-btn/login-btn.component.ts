import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserData } from 'src/app/user-data';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login-btn',
  templateUrl: './login-btn.component.html',
  styleUrls: ['./login-btn.component.css']
})
export class LoginBtnComponent implements OnInit {
  //horseids:string[];
  constructor(private router: Router,
    private form: FormBuilder,
    private userService: UserDataService,
    private authService: AuthService) {}
  
    logInForm= this.form.group({
      email: [ null, [ Validators.required, Validators.minLength(8) ] ],
      password: [ null, [ Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-zd$@$!%*?&].{8,}') ]
      ],
    });
  ngOnInit(): void {
  }
  
  logIn() { 
    this.userService.logInUser(this.logInForm).subscribe(res => {
     //let result=res[0].payload.doc.get("horse1_id");

    //  sessionStorage.setItem('OwnerName',res[0].payload.doc.get("userName"));
   //  sessionStorage.setItem('UserID',res[0].payload.doc.id);

     //console.log(res[0].payload.doc.id);
     
     //if (!result)  result="8fENDN3vsgVdahBx6SsY";
     //this.router.navigate(['horse-page/'+sessionStorage.getItem("UId")]);
   //  this.router.navigate(['my-horses']);
     
     //sessionStorage.setItem('horseid',result);
    
    // sessionStorage.setItem('horseids',this.horseids[0]);
     //sessionStorage.setItem('horseids',this.horseids[0]);
     //console.log(result);
     
      // this.router.navigate( res[0].payload.doc.id
      console.log(res)
     this.authService.setUId(res[0].payload.doc.id)
     this.router.navigate(['my-horses/:id'])
    })
  }

}
