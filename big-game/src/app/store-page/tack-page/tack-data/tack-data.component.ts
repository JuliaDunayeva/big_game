import { Component, OnInit, Input } from '@angular/core';
import { SaddlesService } from '../../../services/saddles.service';
import { UserDataService } from '../../../services/user-data.service';
import { HorseDataService } from '../../../services/horse-data.service';
import { AuthService } from '../../../services/auth.service';
import { UserData } from 'src/app/user-data';
import { Equipment } from 'src/app/equipment';

@Component({
  selector: 'app-tack-data',
  templateUrl: './tack-data.component.html',
  styleUrls: ['./tack-data.component.css']
})
export class TackDataComponent implements OnInit {
  @Input() list: [];
  
  Uid: string = this.authService.getUId();
  userEquus: number;
  buyCost: number;


  constructor(private userService: UserDataService, 
              private authService: AuthService, 
              private saddlesService: SaddlesService, 
              private horseService: HorseDataService) { }

  public imgpath = "assets/images/tack-page/";

  buildpath(file: string): string {
    return this.imgpath + file;
  }
  ngOnInit(): void {
    this.userService.getUserByID(this.Uid).subscribe((result) => {
      // console.log('user info', result)
      this.userEquus = result.equus
      console.log('equus', this.userEquus)
    })
  }
  
  buyTack(tackCost) {
    this.costCheck(tackCost)
    console.log('cost',tackCost )
  } 
  // Cost() {
  //   this.userService.subtractEquus(this.Uid, this.user.equus, this.equipment.cost)
    
  // } // used to buy a new Tack and pay X Equus


  haveMoney: boolean;
  costCheck(cost) {
    if (this.userEquus >= cost) {
        this.userService.subtractEquus(this.Uid, this.userEquus, cost );   
    } else {
      alert('Not enough equus')
    } 
    // used to buy a new Tack and pay X Equus
  }

  

  //     haveMoney: boolean;
  //     this.costCheck() {
  //       if (this.user.equus >= ) {
  //         this.Cost();
  //         return this.haveMoney = true;
  //       }
  //       else {
  //         return this.haveMoney = false;
  //       }
  //     }
  //   this.Cost() {
  //       this.userService.subtractEquus(this.Uid, this.user.equus, )
  //     } // used to buy a new Tack and pay X Equus
    
  //     haveMoney: boolean;
  //     this.costCheck() {
  //       if (this.user.equus >= ) {
  //         this.Cost();
  //         return this.haveMoney = true;
  //       }
  //       else {
  //         return this.haveMoney = false;
  //       }
  //     }
  //   this.Cost();
  //     return this.haveMoney = true;
  //   }
  //   else {
  //     return this.haveMoney = false;
  //   }
  // }
  // Uid(Uid: any, equus: any) { }
}