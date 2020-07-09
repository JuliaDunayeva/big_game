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
    
    //this.horse =
    
  }

  ngOnInit(): void {
    this.id = this.authService.getHorseId();
    this.getHorse();
    //this.horse.id=this.id;
    //this.eqcenterService.getdata(this.horse);
    this.geteq();
    //alert(this.currentEQCenter.eqName);
    //alert(this.horse.id);
    //console.log(this.eqcenterService.getCurrentEQCenter(this.horse.eqCenter));
  }

  getHorse() {
		this.horseDataService.getHorseById(this.id).subscribe((res) => {
      //console.log('my horse ', res);
      
      this.horse = res as HorseData;
      sessionStorage.setItem("currentEQ",this.horse.eqCenter);
      //sessionStorage.setItem("horse",JSON.stringify(this.horse));
      //console.log("convert from string to JSON -> " + JSON.parse(sessionStorage.getItem("horse")));
      //this.eq=this.horse.eqCenter;
      //console.log(JSON.stringify(this.horse));
      })

      
      //console.log(this.eq);
  } // end of GetHorse() function
  
  geteq(){
    this.eqcenterService.getCurrentEQCenter(sessionStorage.getItem("currentEQ")).subscribe((res) => {
      //console.log('my horse ', res);
      
      this.currentEQCenter = res as EqCenters;
      //this.eq=this.horse.eqCenter;
      console.log(JSON.stringify(this.currentEQCenter));
      })

      //console.log(JSON.stringify(this.currentEQCenter));
    //this.eqcenterService.geteqCenters().subscribe(res => {

//      this.alleqCenters = res as unknown as Array<EqCenters>;

      //this.alleqCenters.sort();
      //this.alleqCenters.reverse();
			//console.log('comps ', this.allCompetitions)
		//})
  }

}
