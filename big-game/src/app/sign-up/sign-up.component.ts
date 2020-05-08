import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HorseCollection } from './horse-collection';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

  horseCollection: HorseCollection = new HorseCollection();
  horseIndex: number = 0;
  selectedHorseName: string = "Paint Horse";
  selectedCoatName: string = "Bay Tobiano";
  constructor(private router: Router) { }

  horseSelected(event: any) {
    switch(event.target.value) {
      case "Paint Horse": {
        this.horseIndex = 0;
        this.selectedHorseName = event.target.value;
        this.selectedCoatName = this.horseCollection.horses[this.horseIndex].coat[0];
        break;
        } 
      case "Akhal-Teke": {
        this.horseIndex = 1;
        this.selectedHorseName = event.target.value;
        this.selectedCoatName = this.horseCollection.horses[this.horseIndex].coat[0];
        break;
        } 
      case "Purebred Spanish Horse": {
        this.horseIndex = 2;
        this.selectedHorseName = event.target.value;
        this.selectedCoatName = this.horseCollection.horses[this.horseIndex].coat[0];
        break;
        } 
      case "Shetland (Pony)": {
        this.horseIndex = 3;
        this.selectedHorseName = event.target.value;
        this.selectedCoatName = this.horseCollection.horses[this.horseIndex].coat[0];
        break;
        } 
      case "Welsh (Pony)": {
        this.horseIndex = 4;
        this.selectedHorseName = event.target.value;
        this.selectedCoatName = this.horseCollection.horses[this.horseIndex].coat[0];
        break;
      }
      case "Quarter Horse": {
        this.horseIndex = 5;
        this.selectedHorseName = event.target.value;
        this.selectedCoatName = this.horseCollection.horses[this.horseIndex].coat[0];
        break;
      }
      case "Shagya Arabian": {
        this.horseIndex = 6;
        this.selectedHorseName = event.target.value;
        this.selectedCoatName = this.horseCollection.horses[this.horseIndex].coat[0];
        break;
      }
      case "Nokota": {
        this.horseIndex = 7;
        this.selectedHorseName = event.target.value;
        this.selectedCoatName = this.horseCollection.horses[this.horseIndex].coat[0];
        break;
      }
      case "Canadian Horse": {
        this.horseIndex = 8;
        this.selectedHorseName = event.target.value;
        this.selectedCoatName = this.horseCollection.horses[this.horseIndex].coat[0];
        break;
      }
      case "Newfoundland Pony (Pony)": {
        this.horseIndex = 9;
        this.selectedHorseName = event.target.value;
        this.selectedCoatName = this.horseCollection.horses[this.horseIndex].coat[0];
        break;
      }
    }
  }

  ngOnInit() {

  }

}
