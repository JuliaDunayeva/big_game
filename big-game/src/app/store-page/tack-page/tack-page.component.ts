import { Equipment } from './../../equipment';
import { SaddlesService } from './../../services/saddles.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tack-page',
  templateUrl: './tack-page.component.html',
  styleUrls: ['./tack-page.component.css']
})

export class TackPageComponent implements OnInit {
  public allHorses = [];
  relationsArray: Array<string>
  saddleIdList: Array<string>
  saddleList: Array<any> = []
  saddle: Equipment;

constructor(private authService: AuthService,
  private saddleService: SaddlesService) { }

ngOnInit(): void {
  this.getHorseSaddlesIds()
}

  getHorseSaddlesIds() {
    let horseId = this.authService.getHorseId()
    this.saddleService.getHorseSaddlesIds(horseId).subscribe(res => {
      this.saddleIdList = res.map(el => el.payload.doc.data()['saddle_id']);
      //loop throug the saddles Ids list to get the saddle object
      // console.log('saddleList is ', this.saddleIdList);
      for (let ind = 0; ind < this.saddleIdList.length; ind++) {
          this.saddleService.getHorseSaddlesNames(this.saddleIdList[0]).then( res => {
            this.saddle = res.data() as Equipment;
            // console.log('one saddle ' ,  this.saddle)
            this.saddleList.push(this.saddle);
            // console.log('saddle as equip ', res.data())
            // console.log('new saddles ' , this.saddleList);
          }
          )
      }
        }
    )
  } 
}
