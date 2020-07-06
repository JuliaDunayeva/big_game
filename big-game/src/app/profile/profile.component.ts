import { AuthService } from './../services/auth.service';
import { UserDataService } from './../services/user-data.service';
import { Component, OnInit } from '@angular/core';
import { UserData } from '../user-data';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: UserData;
  Uid: string = this.authService.getUId();
  // username: string;
  // email: string;
  // password: string;
  constructor(public userDataService: UserDataService,  private authService: AuthService) { }

  ngOnInit(): void {
   this.getUserData();
  }

  getUserData() {
    this.userDataService.getUserByID(this.Uid).subscribe((res) => {
      this.userInfo = res as UserData;
    })
  }

  updateUserName(username){
    console.log(username)
    this.userDataService.updateName(this.Uid, username )
  }

  updateUserEmail(email: string){
    this.userDataService.updateEmail(this.Uid, email);
  }

  updateUserPass(password){
    this.userDataService.updatePass(this.Uid, password);
  }
}
