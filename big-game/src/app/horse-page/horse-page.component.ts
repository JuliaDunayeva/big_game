import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from '@angular/common/http';
import { getLocaleDateFormat } from '@angular/common';
import { Color } from '../color';
import { ColorService } from '../services/color.service';
import { BreedService } from '../services/breed.service';
import { Breed } from '../breed';
import { UserData } from '../user-data';
import { UserDataService } from '../services/user-data.service';
import { HorseData } from '../horse-data';
import { HorseDataService} from '../services/horse-data.service';

@Component({
  selector: 'app-horse-page',
  templateUrl: './horse-page.component.html',
  styleUrls: ['./horse-page.component.css']
})

export class HorsePageComponent implements OnInit {

  colors: Color[] = [];
  allColors: Color[];
  allBreeds: Breed[];
  allSkills: string[];
  skill: string;
  allHorseData: HorseData[];
  userData: UserData[];
  

   public isRidesCollapsed = false;

  public isCareCollapsed = false;
 
  public isNightCollapsed = false;
  public isTrainingCollapsed = false;

  public isECCollapsed = false;
  public isCompetitionCollapsed = false;

  public isHistoryCollapsed = false;
  public isBreedingCollapsed = false;

  public isMiddleCollapsed =false;
   
  active = 1;

  ctrl = new FormControl(null, Validators.required);

  public preventchange_1:true;

  public readonly = true;

  public value = 0;
  
  //UserDataService: any;
  
  constructor(private router: Router, 
    private http: HttpClient,
    public colorService: ColorService, 
    public breedService: BreedService,
    public userDataService: UserDataService,
    public horseDataService: HorseDataService) { }

ngOnInit(): void {
	this.getBreeds();
	this.getColors();   
	this.getUserData(); 
	this.getHorseData();
}
 

toggle() {
	if (this.ctrl.disabled) {
		this.ctrl.enable();
	} else {
		this.ctrl.disable();
	}
}

  getBreeds(): Breed[]{
    this.breedService.getBreeds().subscribe(
      result => {
        console.log(result);
        this.allBreeds = result as Array<Breed>;
        // for (let i = 0 ; i < this.allBreeds.length ; i++) {
        //   this.allSkills.push(this.allBreeds[i].skill)
        // }
        console.log(this.allBreeds[0].skill);
        // console.log(this.allSkills);
      }
    )
    return this.allBreeds;
  }

  getColors(): Color[] {
    this.colorService.getColors().subscribe(
      result =>{
        console.log(result);
        this.allColors = result as Array<Color>;
        console.log(this.allColors[0].color)
      }
    )
    return this.colors;
  }

  getUserData(): UserData[] {
    this.userDataService.getUserData().subscribe(
      result =>{
        console.log(result);
        this.userData = result as Array<UserData>;
        console.log(this.userData[0].password);
      }
    )
    return this.userData;
  }
  getHorseData(): HorseData[] {
    this.horseDataService.getHorseData().subscribe(
            result =>{
              console.log(result);
              this.allHorseData = result as Array<HorseData>;
              console.log(this.allHorseData[0].stamina)
            }
        )
      return this.allHorseData;
  }

 public beforeChange($event: NgbPanelChangeEvent) {

    if ($event.panelId === 'preventchange_1' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

}
