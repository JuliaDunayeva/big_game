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
    }
  }

  getHorses() {
    this.horseService.getHorsesByUid().subscribe(res => {
      this.allHorses= res as Array<HorseData>
      console.log(this.allHorses)
    });
  }
    

  swapGender(horse:string){
   let  genderIndex = this.allHorses.map((o) => o.name).indexOf(horse);
   this.gender=this.allHorses[genderIndex].gender
   console.log("before " + this.allHorses[genderIndex].gender)
  this.allHorses[genderIndex].gender="this.gender=='mare'"?'stallion':'mare';
		console.log("after " +this.allHorses[genderIndex].gender)
	}
}
