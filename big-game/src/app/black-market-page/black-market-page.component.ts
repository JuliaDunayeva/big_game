import { Component, OnInit } from '@angular/core';
import { HorseDataService } from '../services/horse-data.service';
import { HorseData } from '../horse-data';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-black-market-page',
  templateUrl: './black-market-page.component.html',
  styleUrls: ['./black-market-page.component.css']
})

export class BlackMarketPageComponent implements OnInit {
  Name: string ;
  allHorses: HorseData[];
  selectedHorse:string;
  gender: string;

  constructor(private horseService: HorseDataService,
    private authservice: AuthService) {}

  ngOnInit(): void {
    this.getHorses() 
  }

  getHorses() {
    this.horseService.getHorsesByUid().subscribe(res => {
      this.allHorses= res as unknown as Array<HorseData>
      console.log(this.allHorses)
    });
  }

  idOfHorse: string;
  genderOfHorse: string;
  onHorseSelect(gender: string, id) {
    console.log(gender);
    this.genderOfHorse = gender
    this.idOfHorse = id;
  }

  
  horse:HorseData
  swapGender(){
    console.log(this.genderOfHorse);
    const gender = this.defineGender(this.genderOfHorse)
    console.log(gender);
    this.horseService.updateHorseGender(this.idOfHorse, gender)
  }

  defineGender(gender: string): string {
    if(gender === "mare") {
      return "stallion"
    } 
    return "mare"  
  }
}
