import { Equipment } from './../equipment';
import { SaddlesService } from './../services/saddles.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TackService } from '../services/tack.service';
import { UserDataService } from '../services/user-data.service';
import { UserData } from '../user-data';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.css']
})

export class StorePageComponent implements OnInit {
  selectTack: FormGroup;
  horse_id: string = this.authService.getHorseId();
  UId: string = this.authService.getUId();
  id: string;
  cost: number;
  public equipment: Equipment;
  tackList: Array<any> = [];
  user: any;

constructor(private authService: AuthService,
    private saddlesService: SaddlesService,
    private tackService: TackService,
    private userService: UserDataService) { }

  ngOnInit(): void {
    this.getHorseTack2();
    this.userService.getUserByID(this.UId).subscribe((result) => {
      this.user=result as UserData;
    });
  }

  getHorseTack2() {
    this.tackService.getTackByHorse(this.horse_id).subscribe(data => {
        this.tackList = data.map(res => {
          return {
            tack_id: res.payload.doc.id,
            horse_id: res.payload.doc.data()['horse_id'],
            saddle_id: res.payload.doc.data()['saddle_id'],
            buy_date: res.payload.doc.data()['buy_date'],
            cost: res.payload.doc.data()['cost'],
          }
        });
        for (let i = 0; i < this.tackList.length; i++ ) {
            this.saddlesService.getHorseSaddlesNames(this.tackList[i].saddle_id).then(
           tack => 
           this.tackList[i].saddle_id = tack.data()['name']
            )}
           })
          this.saddlesService.getHorseSaddlesIds(this.horse_id);
          // console.log('horse_tack', this.tackList);
  }

  selectItem(id: string, cost: number) {
    this.id = id;
    this.cost = cost/2;
    // console.log('select', this.id, this.cost)
  }

  deleteItems() {
    this.tackService.sellTack(this.id);
  }

  sellTackItem() {
    this.deleteItems();
    this.userService.addEquus(this.UId, this.user.equus, this.cost);
    alert('Your item has been sold for ' + this.cost)
  }

}
