import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  styleUrls: ['./horse-page.component.css'],
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


 public horse: HorseData;

 public id: string;

 public imagePath:string;
 public imageFile:string;

 // Buttons for care tab
 public feedButton : string;
 public drinkButton: string;
 public strokeButton:string;

 public groomButton:string;
 public carrotButton:string;
 public mashButton:string;

 swap:boolean;


 //Buttons for night tab
 public putToBedButton:string
 public ageButton:string;
  
  constructor(private router: ActivatedRoute, 
    private http: HttpClient,
    public colorService: ColorService, 
    public breedService: BreedService,
    public userDataService: UserDataService,

    public horseDataService: HorseDataService) {
      //this.id = this.router.snapshot.params.id;
      this.id='rkxQAx7i3FGRY3wOY3pQ'
    }

ngOnInit(): void {
  //this.router.snapshot.params.id
  	this.horseDataService.getHorseById(this.id).subscribe(res => {
    		this.horse = res;
	  });
	  
	this.feedButton='assets/images/horse-page-icons/feed-button-enabled.png';
  	this.drinkButton='assets/images/horse-page-icons/drink-button-disabled.png';
	this.strokeButton='assets/images/horse-page-icons/stroke-button-disabled.png';

  	this.groomButton='assets/images/horse-page-icons/groom-button-disabled.png';
  	this.carrotButton='assets/images/horse-page-icons/carrot-button-disabled.png';
  	this.mashButton='assets/images/horse-page-icons/mash-button-disabled.png';

	this.imageFile='assets/images/horses/mustang/alz-b.png';

	this.swap=true;
	this.changeButtons();

	this.getBreeds();
	this.getColors();   
	this.getUserData(); 
	this.getHorseData();
}

public changeButtons(){
	this.swap=!this.swap;
	if (this.swap){
	this.feedButton='assets/images/horse-page-icons/drink-button-disabled.png';
	this.drinkButton='assets/images/horse-page-icons/feed-button-enabled.png';
	} else {
		this.feedButton='assets/images/horse-page-icons/feed-button-enabled.png';
		this.drinkButton='assets/images/horse-page-icons/drink-button-disabled.png';
		
	}
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
       // console.log(result);
        this.allBreeds = result as Array<Breed>;
     
        // console.log(this.allSkills);
      }
    )
    return this.allBreeds;
}

getColors(): Color[] {
    this.colorService.getColors().subscribe(
      result =>{
        //console.log(result);
        this.allColors = result as Array<Color>;
        //console.log(this.allColors[0].color)
      }
    )
    return this.colors;
}

getUserData(): UserData[] {
    this.userDataService.getUserData().subscribe(
      result =>{
        //console.log(result);
        this.userData = result as Array<UserData>;
        console.log(this.userData);
      }
    )
    return this.userData;
}

getHorseData(): HorseData[] {
    this.horseDataService.getHorseData().subscribe(
            result =>{
              console.log(result);
              this.allHorseData = result as Array<HorseData>;
              //console.log(this.allHorseData[0].stamina)
            }
        );
     // console.log(this.allHorseData);
	return this.allHorseData;
}

public beforeChange($event: NgbPanelChangeEvent) {

    if ($event.panelId === 'preventchange_1' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

}
