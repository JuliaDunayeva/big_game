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
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
allHorseData: HorseData[];
skill: string;
userData: UserData[];

public isCareCollapsed = false;
public isRideCollapsed = false;

public isNightCollapsed = false;
public isTrainingCollapsed = false;

public isECCollapsed = false;
public isCompetitionCollapsed = false;

public isHistoryCollapsed = false;
public isBreedingCollapsed = false;

public isMiddleCollapsed =false;

ctrl = new FormControl(null, Validators.required);

public readonly = true;
public value = 0;
public userIndex=1;
    
  constructor(private router: Router, 
    private http: HttpClient,
    public colorService: ColorService, 
    public breedService: BreedService,
    public userDataService: UserDataService,
    public HorseDataService: HorseDataService) { }
  
	createdata(){
		this.userDataService.createdata();
  		console.log('add user');
	}
	  
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
        console.log(this.allBreeds[0].skill);
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
        console.log(this.userData[0].userName);
      }
    )
    return this.userData;
  }

  getHorseData(): HorseData[] {
    this.HorseDataService.getHorseData().subscribe(
      result =>{
        console.log(result);
        this.allHorseData = result as Array<HorseData>;
        console.log(this.allHorseData[0].stamina)
      }
    )
    return this.allHorseData;
  }
 
 public beforeChange($event: NgbPanelChangeEvent) {

    if ($event.panelId === 'preventchange' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

}
