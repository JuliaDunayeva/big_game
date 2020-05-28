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
  horseids:string[];
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

     //let result=res[0].payload.doc.get("horse1_id");
     //sessionStorage.setItem('OwnerName',res[0].payload.doc.get("userName"));
     //sessionStorage.setItem('UserID',res[0].payload.doc.id);
     //console.log(res[0].payload.doc.id);
     
     //if (!result)  result="8fENDN3vsgVdahBx6SsY";
     //this.router.navigate(['horse-page/'+sessionStorage.getItem("UId")]);
     //let result=res[0].payload.doc.get("horse1_id");
     //sessionStorage.setItem('userid',res[0].payload.doc.get("userName"));
     //if (!result)  result="L8oPf32haDv3lcAzepVA";
     //this.router.navigate(['horse-page/'+result])
      sessionStorage.setItem("uid",res[0].payload.doc.id);
     this.router.navigate(['horse-list']);

     
     //sessionStorage.setItem('horseid',result);
    
    // sessionStorage.setItem('horseids',this.horseids[0]);
     //sessionStorage.setItem('horseids',this.horseids[0]);
     //console.log(result);
     
      // this.router.navigate( res[0].payload.doc.id
    })
  }

}
