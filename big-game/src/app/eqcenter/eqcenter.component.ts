import { Component, OnInit } from '@angular/core';
import { EqCenterService } from 'src/app/services/eq-center-service.service';
import { EqCenters } from '../eq-centers';
import { HorseData } from '../horse-data';
import { HorseDataService } from '../services/horse-data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-eqcenter',
  templateUrl: './eqcenter.component.html',
  styleUrls: ['./eqcenter.component.css']
})

export class EqcenterComponent implements OnInit {
  public id: string;
  public currentEQCenter:EqCenters = new EqCenters;
  public eq:string;
  public horse: HorseData = new HorseData;

  constructor( public horseDataService: HorseDataService, private authService: AuthService, private eqcenterService: EqCenterService) {
  }

  ngOnInit(): void {
    this.id = this.authService.getHorseId();
    this.getHorse();
    this.getEQ();
  } // End of ngOnInit() Function

  getHorse() {
		this.horseDataService.getHorseById(this.id).subscribe((res) => {
      this.horse = res as HorseData;
      sessionStorage.setItem("currentEQ", this.horse.eqCenter);
      })
  } // end of GetHorse() function
  
  getEQ(){
    this.eqcenterService.getCurrentEQCenter(sessionStorage.getItem("currentEQ")).subscribe((res) => {
      this.currentEQCenter = res as unknown as EqCenters;
      //console.log(JSON.stringify(this.currentEQCenter));
      })
  }
}
