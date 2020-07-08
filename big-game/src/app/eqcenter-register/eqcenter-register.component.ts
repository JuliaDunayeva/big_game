import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HorseData } from '../horse-data';
import { HorseDataService } from '../services/horse-data.service';
import { AuthService } from '../services/auth.service';
import { CompetitionService } from 'src/app/services/competition.service';
import { EqCenterService } from 'src/app/services/eq-center-service.service';
import { EqCenters } from '../eq-centers';

@Component({
  selector: 'app-eqcenter-register',
  templateUrl: './eqcenter-register.component.html',
  styleUrls: ['./eqcenter-register.component.css']
})
export class EqcenterRegisterComponent implements OnInit {

  public horse: HorseData;
  public id: string;
  alleqCenters: Array<EqCenters>;
  public selected: boolean = true;
  selectEQCenter: FormGroup

  constructor( public horseDataService: HorseDataService, private authService: AuthService, private eqcenterService: EqCenterService,  private fb: FormBuilder) {
      this.id = this.authService.getHorseId();
    }

  ngOnInit(): void {
    this.horseDataService.getHorseById(this.authService.getHorseId()).subscribe(res => {

      this.horse = res as HorseData;
    });
   

    this.showEqCenters();
   
    this.createForm();
  }

  createForm() {
    this.selectEQCenter = this.fb.group({
      eqSelect: ['something', Validators.required]
    })
  }

  showEqCenters() {
    eq:EqCenters;
		this.eqcenterService.geteqCenters().subscribe(res => {

      this.alleqCenters = res as unknown as Array<EqCenters>;

      //this.alleqCenters.sort();
      //this.alleqCenters.reverse();
			//console.log('comps ', this.allCompetitions)
		})
  }
  
  selectEQ(event: any){
    //2this.horse.id=this.authService.getHorseId();
    //let something = (<HTMLInputElement>event.target).id;
    //console.log(something);
    //alert((<HTMLInputElement>event.target).id);
    //alert((<HTMLInputElement>event.target).value);
    this.horse.eqCenter=(<HTMLInputElement>event.target).id;
    //alert(this.horse.eqCenter);
    this.horseDataService.setHorseEQCenter(this.horse,(<HTMLInputElement>event.target).value);
    //console.log('clicked');
  }

}
