import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/user-data';
import { UserDataService } from 'src/app/services/user-data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mini-bar',
  templateUrl: './mini-bar.component.html',
  styleUrls: ['./mini-bar.component.css']
})

export class MiniBarComponent implements OnInit {
  Uid: string = this.authService.getUId();
  user: any;
  
  constructor(private authService: AuthService,
        private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.userDataService.getUserByID(this.Uid).subscribe((result) => {
      this.user = result as UserData;
    });
    return this.user;
  }
  
  Logout(){
    sessionStorage.clear();
  }
}
