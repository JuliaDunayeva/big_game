import { Component, OnInit } from '@angular/core';
import { HorseData } from '../horse-data';
import { HorseDataService } from '../services/horse-data.service';
import { AuthService } from '../services/auth.service';
import { CompetitionService } from 'src/app/services/competition.service';
import { Compete } from '../compete';

@Component({
  selector: 'app-eqcenter-register',
  templateUrl: './eqcenter-register.component.html',
  styleUrls: ['./eqcenter-register.component.css']
})
export class EqcenterRegisterComponent implements OnInit {

  public horse: HorseData;
  public id: string;
  allCompetitions: Array<Compete>;
  public selected: boolean = true;

  constructor( public horseDataService: HorseDataService, private authService: AuthService, private competitionService: CompetitionService) {
      this.id = this.authService.getHorseId();
    }

  ngOnInit(): void {
    this.showCompetitions();
  }

  showCompetitions() {
		this.competitionService.getCompetitions().subscribe(res => {
			this.allCompetitions = res as unknown as Array<Compete>;
			//console.log('comps ', this.allCompetitions)
		})
	}

}
