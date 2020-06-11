import { Component, OnInit } from '@angular/core';
import { UserData } from '../user-data';
import { UserDataService } from '../services/user-data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  Uid: string = this.authService.getUId();
  user: any;

  constructor(private authService: AuthService,
        private userDataService: UserDataService) { }

  ngOnInit(): void {
          this.userDataService.getUserByID(this.Uid).subscribe((result) => {
            this.user = result as UserData;
        });
        return this.user;
      }

  Logout(){
    sessionStorage.clear();
  }

  
}
