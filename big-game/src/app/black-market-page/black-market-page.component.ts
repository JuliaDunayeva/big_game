import { Component, OnInit } from '@angular/core';
import { HorseDataService } from '../services/horse-data.service';

@Component({
  selector: 'app-black-market-page',
  templateUrl: './black-market-page.component.html',
  styleUrls: ['./black-market-page.component.css']
})
export class BlackMarketPageComponent implements OnInit {

  constructor(private horseService: HorseDataService) {}

  ngOnInit(): void {
    this.changeGender()
  }

  changeGender() {
    this.horseService.getHorsesByUid().subscribe(res => {
      console.log(res)
    });
  }

  getNames(){
    this.horseService.getHorsesByUid().subscribe(res => {
  }
  onClick(){

  }

}
