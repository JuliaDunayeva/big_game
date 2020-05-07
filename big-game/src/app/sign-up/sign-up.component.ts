import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HorseCollection } from './horse-collection';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  horseCollection: HorseCollection = new HorseCollection();
  horseIndex: number = 0;
  // coatIndex: number = 0;
  selectedHorseName: string = "Paint Horse";
  selectedCoatName: string = "Bay Tobiano";
  constructor(private router: Router) { }

  horseSelected(event: any) {
    switch(event.target.value) {
      case "Paint Horse": {
        this.horseIndex = 0;
        this.selectedHorseName = event.target.value;
        break;
        } 
      case "Akhal-Teke": {
        this.horseIndex = 1;
        this.selectedHorseName = event.target.value;
        break;
        } 
      case "Purebred Spanish Horse": {
        this.horseIndex = 2;
        this.selectedHorseName = event.target.value;
        break;
        } 
      case "Shetland (Pony)": {
        this.horseIndex = 3;
        this.selectedHorseName = event.target.value;
        break;
        } 
      case "Welsh (Pony)": {
        this.horseIndex = 4;
        this.selectedHorseName = event.target.value;
        break;
      }
      case "Quarter Horse": {
        this.horseIndex = 5;
        this.selectedHorseName = event.target.value;
        break;
      }
      case "Welsh (Pony": {
        this.horseIndex = 6;
        this.selectedHorseName = event.target.value;
        break;
      }
      case "Shagya Arabian": {
        this.horseIndex = 7;
        this.selectedHorseName = event.target.value;
        break;
      }
      case "Nokota": {
        this.horseIndex = 8;
        this.selectedHorseName = event.target.value;
        break;
      }
      case "Canadian Horse": {
        this.horseIndex = 9;
        this.selectedHorseName = event.target.value;
        break;
      }
      case "Newfoundland Pony (Pony)": {
        this.horseIndex = 10;
        this.selectedHorseName = event.target.value;
        break;
      }
    }
    console.log(event.target.value)
  }

  coatSelected(event: any) {

  }
}
