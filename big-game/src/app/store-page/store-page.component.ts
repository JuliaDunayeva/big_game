import { Equipment } from './../equipment';
import { SaddlesService } from './../services/saddles.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TackService } from '../services/tack.service';
import { HorseTack } from '../horse-tack';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.css']
})

export class StorePageComponent implements OnInit {
  selectTack: FormGroup;
  horse_id: string = this.authService.getHorseId();
  public equipment: Equipment;
  tackList: HorseTack[];

constructor(private authService: AuthService,
    private saddlesService: SaddlesService,
    private tackService: TackService) { }

  ngOnInit(): void {
    this.getHorseTack();
  }

  getHorseTack() {
    this.tackService.getTackByHorse(this.horse_id)
      .subscribe(res => 
        {
        this.tackList = res.map(tack =>
          tack.payload.doc.data() as HorseTack
        )
        for (let i = 0; i < this.tackList.length; i++ ) {
          this.saddlesService.getHorseSaddlesNames(this.tackList[i].saddle_id).then(
            tack => 
            this.tackList[i].saddle_id = tack.data()['name']
          )
        }
        console.log(this.tackList)
        }
      )
    
    this.saddlesService.getHorseSaddlesIds(this.horse_id)
  }

  sellTackItem(){
    
  }
}
