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
  selectedHorseName: string = "Paint";
  selectedCoatName: string = "Bay Tobiano";
  selectedHorseSkill: string = "speed";
  constructor(private router: Router) { }

  horseSelected(event: any) {
    switch(event.target.value) {
      case "Paint Horse": {
        this.horseIndex = 0;
        this.selectedHorseName = "Paint";
        this.selectedCoatName = this.horseCollection.horses[this.horseIndex].coat[0];
        this.selectedHorseSkill = "speed";
        break;
        } 
      case "Akhal-Teke": {
        this.horseIndex = 1;
        this.selectedHorseName = event.target.value;
        this.selectedCoatName = this.horseCollection.horses[this.horseIndex].coat[0];
        this.selectedHorseSkill = "Stamina";
        break;
        } 
      case "Purebred Spanish Horse": {
        this.horseIndex = 2;
        this.selectedHorseName = "Purebred";
        this.selectedCoatName = this.horseCollection.horses[this.horseIndex].coat[0];
        this.selectedHorseSkill = "Dressage";
        break;
        } 
      case "Shetland (Pony)": {
        this.horseIndex = 3;
        this.selectedHorseName = "Shetland";
        this.selectedCoatName = this.horseCollection.horses[this.horseIndex].coat[0];
        this.selectedHorseSkill = "Jumping";
        break;
        } 
      case "Welsh (Pony)": {
        this.horseIndex = 4;
        this.selectedHorseName = "Welsh";
        this.selectedCoatName = this.horseCollection.horses[this.horseIndex].coat[0];
        this.selectedHorseSkill = "Galloping";
        break;
      }
      case "Quarter Horse": {
        this.horseIndex = 5;
        this.selectedHorseName = "Quarter";
        this.selectedCoatName = this.horseCollection.horses[this.horseIndex].coat[0];
        this.selectedHorseSkill = "Stamina";
        break;
      }
      case "Shagya Arabian": {
        this.horseIndex = 6;
        this.selectedHorseName = "Shagya";
        this.selectedCoatName = this.horseCollection.horses[this.horseIndex].coat[0];
        this.selectedHorseSkill = "Stamina";
        break;
      }
      case "Nokota": {
        this.horseIndex = 7;
        this.selectedHorseName = event.target.value;
        this.selectedCoatName = this.horseCollection.horses[this.horseIndex].coat[0];
        this.selectedHorseSkill = "Dressage";
        break;
      }
      case "Canadian Horse": {
        this.horseIndex = 8;
        this.selectedHorseName = "Canadian";
        this.selectedCoatName = this.horseCollection.horses[this.horseIndex].coat[0];
        this.selectedHorseSkill = "Stamina";
        break;
      }
      case "Newfoundland Pony (Pony)": {
        this.horseIndex = 9;
        this.selectedHorseName = "Newfoundland";
        this.selectedCoatName = this.horseCollection.horses[this.horseIndex].coat[0];
        this.selectedHorseSkill = "Jumping";
        break;
      }
    }
  }

  ngOnInit() {

  }

}
