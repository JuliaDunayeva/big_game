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
import { HorsePageButtons } from '../horse-page-buttons';

@Component({
  selector: 'app-horse-page',
  templateUrl: './horse-page.component.html',
  styleUrls: ['./horse-page.component.css'],
})

export class HorsePageComponent implements OnInit {

	//constFeed=0;
		
	//pageButtons:HorsePageButtons[]=new HorsePageButtons[];

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

// Buttons for Ride tab
 public forestButton:string;
 public mountainButton:string;

 public emptyButton:string;

 swap:boolean=false;

 //Buttons for night tab
 public putToBedButton:string
 public ageButton:string;

 public ownerName:string;

 public horseIDs:string[];

 public myHorses:HorseData[];

 public percent:number=100;
 public hours:number=24;

 public seconds:number;

 public hour:number=23;
 public minute:number=60;;

 public percentStr:string;

  
constructor(private router: ActivatedRoute, 
	private http: HttpClient,
	public colorService: ColorService, 
	public breedService: BreedService,
	public userDataService: UserDataService,
	public horseDataService: HorseDataService) {
	//this.id=sessionStorage.getItem('horseid');
		this.id = this.router.snapshot.params.id;
	     // this.id='rkxQAx7i3FGRY3wOY3pQ'
	  //   this.imageFile   = '../../assets/images/horses/akhal_teke/alz-b.png';
	   //  this.imagePath = '../../assets/images/horses/akhal_teke/alz-b.png';
	}

ngOnInit(): void {
	//this.id=sessionStorage.getItem('horseid');
    	this.horseDataService.getHorseById(this.id).subscribe(res => {
    		this.horse = res;
	  });

	//  this.pageButtons[0].enabledImage='assets/images/horse-page-icons/feed-button-enabled.png';
//	  this.pageButtons[0].disabledImage='assets/images/horse-page-icons/feed-button-disabled.png';
	//  this.pageButtons[0].enabled=true;

	  this.ownerName=sessionStorage.getItem('userid');
	  //console.log(sessionStorage.getItem("horseids"));
	
	this.feedButton='assets/images/horse-page-icons/feed-button-enabled.png';
  	this.drinkButton='assets/images/horse-page-icons/drink-button-disabled.png';
	this.strokeButton='assets/images/horse-page-icons/stroke-button-disabled.png';

  	this.groomButton='assets/images/horse-page-icons/groom-button-disabled.png';
  	this.carrotButton='assets/images/horse-page-icons/carrot-button-disabled.png';
	this.mashButton='assets/images/horse-page-icons/mash-button-disabled.png';
	  
	this.forestButton='assets/images/horse-page-icons/forest-button-enabled.png';
	this.mountainButton='assets/images/horse-page-icons/mountain-button-enabled.png';

	this.emptyButton='assets/images/horse-page-icons/empty-button.png';

	this.imageFile= 'assets/images/horses/akhal_teke/alz-b.png';

	this.imagePath = 'assets/images/horses/';

	// 24 / 3 = 8  -- answer, use below
	//100 / 8 = 12.5
	
	//this.swap=false;
//	this.changeButtons();
	this.getBreeds();
	this.getColors();   

	this.getUserData(); 
	this.getHorseData();
//let index=0;

//	for (index<this.userData[0].myHorses.length;index++){
		//console.log(this.userData[0].myHorses[index]);
	//}
	//this.horseDataService.getHorseById(this.id).subscribe(res => {
		//this.horse = res;
	//}

	setTimeout(() => 
	{
		this.LoadHorseImage();
	}, 1250);

//sessionStorage.setItem("horseid",this.id);
//console.log(this.id);
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

public FeedButton(){
	this.hour=24;
	this.minute=0;
	// convert time to seconds then back again to display in circlur progress  bar
	this.seconds= (this.hour * 3600) + (this.minute * 60) ;
	console.log(this.seconds);
	/*this.minute-=15;
	if(this.minute<0){
		this.minute=60;
		this.hour-=1;
	}
	this.hours=this.hours/0.25;
	this.percent=(24/this.hours)/8;
	this.percent= parseFloat(this.percent.toString()).toFixed(2);*/
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
