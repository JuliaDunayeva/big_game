import { Component, OnInit, Input } from '@angular/core';
import { UserDataService } from '../../../services/user-data.service';
import { AuthService } from '../../../services/auth.service';
import { Equipment } from 'src/app/equipment';
import { TackService } from 'src/app/services/tack.service';


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
  horse_id: string = this.authService.getHorseId();


  constructor(private userService: UserDataService, 
              private authService: AuthService, 
              private tackService: TackService) { }

  public imgpath = "assets/images/tack-page/";

  buildpath(file: string): string {
    return this.imgpath + file;
  }
  ngOnInit(): void {
    console.log('begining')
    this.userService.getUserByID(this.Uid).subscribe((result) => {
      // console.log('user info', result)
      this.userEquus = result.equus
      console.log('equus', this.userEquus)
    })
  }

  haveMoney: boolean;
  costCheck(equipment: Equipment) {
    if (this.userEquus >= equipment.cost) {
        this.userService.subtractEquus(this.Uid, this.userEquus, equipment.cost ); 
        this.tackService.buyTack(this.horse_id, equipment.saddleId, equipment.cost)
          alert('You have bought the item')
  
    } else {
      alert('Not enough equus to buy this item.')
    } 
    // used to buy a new Tack and pay X Equus
  }


}