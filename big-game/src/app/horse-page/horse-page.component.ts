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
  allBreeds:Breed[];
  allSkills: string[];
  skill: string;
  allHorseData: HorseData[];
  userData: UserData[];

  breedIndex:number=-1;
  colorIndex:number=-1;
    
  public isRidesCollapsed = false;
  public isCareCollapsed = false;
  public isNightCollapsed = false;
  public isTrainingCollapsed = false;
  public isECCollapsed = false;
  public isCompetitionCollapsed = false;
  public isHistoryCollapsed = false;
  public isBreedingCollapsed = false;
   
  active = 1;
  ctrl = new FormControl(null, Validators.required);

  public preventchange_1:true;
  public readonly = true;
  public value = 0;

 public horse: HorseData;

 public id: string;

// Paths for horse images
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
	this.id = this.router.snapshot.params.id;
	     // this.id='rkxQAx7i3FGRY3wOY3pQ'
	  //   this.imageFile   = '../../assets/images/horses/akhal_teke/alz-b.png';
	   //  this.imagePath = '../../assets/images/horses/akhal_teke/alz-b.png';
    }

ngOnInit(): void {
	
    	this.horseDataService.getHorseById(this.id).subscribe(res => {
    		this.horse = res;
	  });
	  
	this.feedButton='assets/images/horse-page-icons/feed-button-enabled.png';
  	this.drinkButton='assets/images/horse-page-icons/drink-button-disabled.png';
	this.strokeButton='assets/images/horse-page-icons/stroke-button-disabled.png';

  	this.groomButton='assets/images/horse-page-icons/groom-button-disabled.png';
  	this.carrotButton='assets/images/horse-page-icons/carrot-button-disabled.png';
  	this.mashButton='assets/images/horse-page-icons/mash-button-disabled.png';

	this.imageFile= 'assets/images/horses/akhal_teke/alz-b.png';

	this.imagePath = 'assets/images/horses/';

	this.swap=false;
	this.changeButtons();

	//if (this.allBreeds!=null) 
	this.getBreeds();
	//if (this.allColors!=null)  
	this.getColors();   

	this.getUserData(); 
	this.getHorseData();

	setTimeout(() => 
	{
		this.LoadHorseImage();
	}, 750);

} // end of ngOnInit() function

getBreeds(): Breed[]{
	this.breedService.getBreeds().subscribe(
	  result => {
	   	    this.allBreeds = result as Array<Breed>;
	  }
	)
	return this.allBreeds;
} // end of getBreeds() function
    
    getColors(): Color[] {
	this.colorService.getColors().subscribe(
	  result =>{
	    this.allColors = result as Array<Color>;
	  }
	)
	return this.colors;
} // end of getColors() function

LoadHorseImage(){
	this.imagePath = 'assets/images/horses/';

	if (this.allBreeds!=null) {
		this.breedIndex = this.allBreeds.map((o) => o.breed).indexOf(this.horse.breed);
	}
	if (this.allColors!=null){
		this.colorIndex = this.allColors.map((o) => o.color).indexOf(this.horse.color);
	}

	if (this.breedIndex>-1 && this.colorIndex>-1) {
		this.imagePath += this.allBreeds[this.breedIndex].img_path + '/' + this.allColors[this.colorIndex].img_file;
		console.log(this.imagePath);
	} else {
		this.imagePath=this.imageFile;
	}
} // end of LoadHorseImage() function

public changeButtons(){
	this.swap=!this.swap;
	if (this.swap){
		this.feedButton='assets/images/horse-page-icons/drink-button-disabled.png';
		this.drinkButton='assets/images/horse-page-icons/feed-button-enabled.png';
	} else {
		this.feedButton='assets/images/horse-page-icons/feed-button-enabled.png';
		this.drinkButton='assets/images/horse-page-icons/drink-button-disabled.png';	
	}
} // end of changeButtons() function

toggle() {
	if (this.ctrl.disabled) {
		this.ctrl.enable();
	} else {
		this.ctrl.disable();
	}
} // end of toggle() function



getUserData(): UserData[] {
    this.userDataService.getUserData().subscribe(
      result =>{
        this.userData = result as Array<UserData>;
      }
    )
    return this.userData;
} // enbd of getUserData() function

getHorseData(): HorseData[] {
    this.horseDataService.getHorseData().subscribe(
            result =>{
              this.allHorseData = result as Array<HorseData>;
            }
        );
	return this.allHorseData;
} // end of getHorseData() function

public beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange_1' && $event.nextState === false) {
      $event.preventDefault();
    }
  } // end of beforeChange() function
} // end horse-page component class
