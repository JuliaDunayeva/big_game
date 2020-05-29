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
    
  horse:HorseData
  swapGender(genderform: NgForm){
    const gender = this.defineGender(this.horse.gender)
    const id = this.horse.id
    this.horseService.updateHorseGender(id, gender)
  }

  defineGender(gender: string): string {
    if(gender === "mare") {
      return "stallion"
    } 
    return "mare"  
  }
}
