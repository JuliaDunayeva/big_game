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
  passes:number;
  equus: number;

  constructor(private authService: AuthService,
        private userDataService: UserDataService) { }

  ngOnInit(): void {
          this.userDataService.getUserByID(this.Uid).subscribe((result) => {
            this.user = result as UserData;
        });
        return this.user;
      }

  Logout() {
    sessionStorage.clear();
  }

  morePasses() {
    console.log('old passes and UID', this.user.passes, this.Uid)
   this.userDataService.addPasses(this.Uid, this.user.passes)
  }

  moreEquus() {
    console.log('old equus and UID', this.user.equus, this.Uid)
   this.userDataService.addEquus(this.Uid, this.user.equus)
  }
}
