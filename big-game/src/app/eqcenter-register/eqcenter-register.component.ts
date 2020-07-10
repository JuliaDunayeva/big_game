import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HorseData } from '../horse-data';
import { HorseDataService } from '../services/horse-data.service';
import { AuthService } from '../services/auth.service';
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
    });this.showEqCenters();
   
    this.createForm();
  }

  createForm() {
    this.selectEQCenter = this.fb.group({
      eqSelect: ['something', Validators.required]
    })
  }

  showEqCenters() {
		this.eqcenterService.geteqCenters().subscribe(res => {
      this.alleqCenters = res as unknown as Array<EqCenters>;
		})
  }
  
  selectEQ(event: any){
    this.horse.eqCenter=(<HTMLInputElement>event.target).id.trim();
    this.horseDataService.setHorseEQCenter(this.horse,(<HTMLInputElement>event.target).value);
  }

}
