import { Component, OnInit } from '@angular/core';
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

  constructor( public horseDataService: HorseDataService, private authService: AuthService, private eqcenterService: EqCenterService) {
      this.id = this.authService.getHorseId();
    }

  ngOnInit(): void {
    this.showCompetitions();
  }

  showCompetitions() {
		this.eqcenterService.geteqCenters().subscribe(res => {
			this.alleqCenters = res as unknown as Array<EqCenters>;
			//console.log('comps ', this.allCompetitions)
		})
	}

}
