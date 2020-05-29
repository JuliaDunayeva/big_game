import { Component, OnInit } from '@angular/core';
import { HorseDataService } from '../services/horse-data.service';
import { HorseData } from '../horse-data';
import { AuthService } from '../services/auth.service';

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
    this.changeGender()
    this.getHorses() 
  }

  changeGender() {
    this.horseService.getHorsesByUid().subscribe(res =>{
      console.log(res)
    });
  }

  getHorses() {
    this.horseService.getHorsesByUid().subscribe(res => {
      this.allHorses= res as unknown as Array<HorseData>
      console.log(this.allHorses)
    });
  }
    

  swapGender(horse: HorseData){
    const gender = this.defineGender(horse.gender)
    const id = horse.id
    this.horseService.updateHorse(id, gender)

  }
  defineGender(gender: string): String {
    if(gender === "mare") {
      return "stallion"
    }
    return "mare"  
  }
}
