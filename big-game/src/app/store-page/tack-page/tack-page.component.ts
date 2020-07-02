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
    competitionList: Array<any> = []
    foxHuntList: Array<any> = []
    italianList: Array<any> = []
    saddle: Equipment;
    public equipment: Equipment;

    constructor(private authService: AuthService,
                private saddlesService: SaddlesService) { }

  ngOnInit(): void {
    this.showlist()
    this.competitionlist()
    this.foxHuntlist()
    this.italianlist()
  }

  getHorseSaddlesIds() {
    let horseId = this.authService.getHorseId()
    this.saddlesService.getHorseSaddlesIds(horseId).subscribe(res => {
      this.saddleIdList = res.map(el => el.payload.doc.data()['saddle_id']);
      for (let ind = 0; ind < this.saddleIdList.length; ind++) {
        this.saddlesService.getHorseSaddlesNames(this.saddleIdList[0]).then(res => {
          this.saddle = res.data() as Equipment;
          // console.log('one saddle ' ,  this.saddle)
          this.saddleList.push(this.saddle);
        })
      }
    })
  }


    //for wstern list
  showlist() {
    this.saddlesService.getEquipmentList("western").subscribe(data => {
      // console.log(data);
      this.saddleList = data.map(res => {
        return {
          saddleId: res.payload.doc.id,
          name: res.payload.doc.data()['name'],
          color: res.payload.doc.data()['color'],
          equipment: res.payload.doc.data()['equipment'],
          img_file: res.payload.doc.data()['img_file'],
          id: res.payload.doc.data()['id'],
          group: res.payload.doc.data()['group'],
          dressage_: res.payload.doc.data()['dressage_'],
          gallop_: res.payload.doc.data()['gallop_'],
          jumping_: res.payload.doc.data()['jumping_'],
          speed_: res.payload.doc.data()['speed_'],
          stamina_: res.payload.doc.data()['stamina_'],
          trot_: res.payload.doc.data()['trot_'],
          cost: res.payload.doc.data()['cost'],
        }
      })
      return data;
    })
  }


  //for the competition list
  competitionlist() {
    this.saddlesService.getEquipmentList("competition").subscribe(data => {
      // console.log(data);
      this.competitionList = data.map(res => {
        return {
          saddleId: res.payload.doc.id,
          name: res.payload.doc.data()['name'],
          color: res.payload.doc.data()['color'],
          equipment: res.payload.doc.data()['equipment'],
          img_file: res.payload.doc.data()['img_file'],
          id: res.payload.doc.data()['id'],
          group: res.payload.doc.data()['group'],
          dressage_: res.payload.doc.data()['dressage_'],
          gallop_: res.payload.doc.data()['gallop_'],
          jumping_: res.payload.doc.data()['jumping_'],
          speed_: res.payload.doc.data()['speed_'],
          stamina_: res.payload.doc.data()['stamina_'],
          trot_: res.payload.doc.data()['trot_'],
          cost: res.payload.doc.data()['cost'],
        }
      })
      return data;
    })
  }



  //for the fox hunt list
  foxHuntlist() {
    this.saddlesService.getEquipmentList("fox-hunt").subscribe(data => {
      // console.log(data);
      this.foxHuntList = data.map(res => {
        return {
          saddleId: res.payload.doc.id,
          name: res.payload.doc.data()['name'],
          color: res.payload.doc.data()['color'],
          equipment: res.payload.doc.data()['equipment'],
          img_file: res.payload.doc.data()['img_file'],
          id: res.payload.doc.data()['id'],
          group: res.payload.doc.data()['group'],
          dressage_: res.payload.doc.data()['dressage_'],
          gallop_: res.payload.doc.data()['gallop_'],
          jumping_: res.payload.doc.data()['jumping_'],
          speed_: res.payload.doc.data()['speed_'],
          stamina_: res.payload.doc.data()['stamina_'],
          trot_: res.payload.doc.data()['trot_'],
          cost: res.payload.doc.data()['cost'],
        }
      })
      return data;
    })
  }


  //for the italian list
  italianlist() {
    this.saddlesService.getEquipmentList("italian").subscribe(data => {
      // console.log(data);
      this.italianList = data.map(res => {
        return {
          saddleId: res.payload.doc.id,
          name: res.payload.doc.data()['name'],
          color: res.payload.doc.data()['color'],
          equipment: res.payload.doc.data()['equipment'],
          img_file: res.payload.doc.data()['img_file'],
          id: res.payload.doc.data()['id'],
          group: res.payload.doc.data()['group'],
          dressage_: res.payload.doc.data()['dressage_'],
          gallop_: res.payload.doc.data()['gallop_'],
          jumping_: res.payload.doc.data()['jumping_'],
          speed_: res.payload.doc.data()['speed_'],
          stamina_: res.payload.doc.data()['stamina_'],
          trot_: res.payload.doc.data()['trot_'],
          cost: res.payload.doc.data()['cost'],
        }
      })
      return data;
    })
  }
} 
                                                                                                                                                