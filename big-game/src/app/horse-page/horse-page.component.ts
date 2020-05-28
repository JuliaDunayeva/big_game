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
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-horse-page',
  templateUrl: './horse-page.component.html',
  styleUrls: ['./horse-page.component.css'],
})

export class HorsePageComponent implements OnInit {
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

 public horse: HorseData = new HorseData;

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
 public taskSeconds:number;

 public hour:number=23;
 public minute:number=60;;

 public percentStr:string;

 public totalseconds:number;
public user:UserData;
  
constructor(private router: ActivatedRoute, 
	private http: HttpClient,
	public colorService: ColorService, 
	public breedService: BreedService,
	private userDataService: UserDataService,
	public horseDataService: HorseDataService, private authService:AuthService) {
	
	
		
	}


ngOnInit(): void {
	
	setTimeout(() => 
    {
		
		this.id = this.authService.getHorseId();

		this.getBreeds();
		this.getColors();

		this.getHorse();

		this.userDataService.getUserByID(this.authService.getUId()).subscribe(ref=> { 
			this.user=ref
		//	console.log(this.user);
		 });	

			console.log('got horse data');
		}, 750);



	

	// streamline buttons code, not working on it right now, fixing other more important code
	//  this.pageButtons[0].enabledImage='assets/images/horse-page-icons/feed-button-enabled.png';
//	  this.pageButtons[0].disabledImage='assets/images/horse-page-icons/feed-button-disabled.png';
	//  this.pageButtons[0].enabled=true;

	//  this.ownerName=sessionStorage.getItem('userid');
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

	//this.imageFile= 'assets/images/horses/akhal_teke/alz-b.png';

	//this.imagePath = 'assets/images/horses/';

	this.hour=24;
	this.minute=0;
	// reference
	// 24 / 3 = 8  -- answer, use below
	//100 / 8 = 12.5
	setTimeout(() => 
	{
		this.LoadHorseImage();
		console.log(this.imagePath);
	}, 750);

} // end of ngOnInit() function

getHorse(){
	setTimeout(() => 
	{
	  this.horseDataService.getHorseById(this.id).subscribe(res => {
		this.horse = res;
		console.log(this.horse);
  });
	}, 750);
}

ms2Time(ms:number):string {
    let secs = ms / 1000;
    ms = Math.floor(ms % 1000);
    let minutes = secs / 60;
    secs = Math.floor(secs % 60);
    let hours = minutes / 60;
    minutes = Math.floor(minutes % 60);
	hours = Math.floor(hours % 24);
	console.log(hours + ":" + minutes + ":" + secs);
    return hours + ":" + minutes + ":" + secs + "." + ms;
}

RefreshEnergy(ms:number) {
    let secs = ms / 1000;
    ms = Math.floor(ms % 1000);
    let minutes = secs / 60;
    secs = Math.floor(secs % 60);
    let hours = minutes / 60;
    minutes = Math.floor(minutes % 60);
	hours = Math.floor(hours % 24);
	if (secs>10) this.horse.energy+=5;

	console.log(hours + ":" + minutes + ":" + secs);
    return hours + ":" + minutes + ":" + secs + "." + ms;
}

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
	);
	return this.allColors;
} // end of getColors() function

LoadHorseImage(){
	this.imagePath = 'assets/images/horses';

	//if (this.allBreeds!=null) {
		this.breedIndex = this.allBreeds.map((o) => o.getBreed()).indexOf(this.horse.breed);
		console.log(this.breedIndex);
	//}
	//if (this.allColors!=null){
		this.colorIndex = this.allColors.map((o) => o.getColor()).indexOf(this.horse.color);
	console.log(this.colorIndex);
		//}

	//if (this.breedIndex>-1 && this.colorIndex>-1) {
		this.imagePath += this.allBreeds[this.breedIndex].getImagePath() + '/' + this.allColors[this.colorIndex].getImageFile();
		console.log(this.imagePath);
	//} else {
	//	this.imagePath=this.imageFile;
	//}
} // end of LoadHorseImage() function

public FeedButton(){
	//8,274 seconds = 8,274 seconds ÷ 3,600
	//8,274 seconds = 2.29833 hours
	//minutes = .29833 hours × 60 minutes
	//minutes = 17.9 minutes
	//seconds = .9 minutes × 60 seconds
	//seconds = 54 seconds
	// time = 2:17:54

// var myNum = 10 / 4;       // 2.5
 //var fraction = myNum % 1; // 0.5
 //myNum = -20 / 7;          // -2.857142857142857
 //fraction = myNum % 1;     // -0.857142857142857

	// convert time to seconds then back again to display in circlur progress  bar
	this.seconds= (this.hour * 3600) + (this.minute * 60) ;
	this.taskSeconds= (0 * 3600)+(30 * 60);
	if (this.horse.energy==0) {
		alert("no energy left");
		return;
	}
	if (this.horse.energy>0) this.horse.energy-=5;

	this.totalseconds=(this.seconds-this.taskSeconds);

	this.hour=this.totalseconds/3600;
	
	//this.minute= this.hour-(this.minute/60) % 1;
	this.minute=(this.hour % 1);// * 60;
	
	//let minuteStr=this.minute.toString();
	this.minute=parseFloat(this.minute.toFixed(2));
	//this.percentStr=this.percent.toString();
	this.percent=parseFloat(this.percent.toFixed(0));
	//let secondStr=this.seconds.toString();
	this.seconds=parseFloat(this.seconds.toFixed(0));
		
	//if (this.minute==0.25) this.minute=15;
	//if (this.minute==0.5) this.minute=30;
	//if (this.minute==0.75) this.minute=45;
	this.hour=this.hour-this.minute;
	//this.hour=parseFloat(this.hour.toFixed(3));
	this.hour=parseFloat(this.hour.toFixed(0));

	this.percent=(this.seconds-this.taskSeconds)/1000;

	let totalStr=this.totalseconds.toString();
	this.totalseconds=parseFloat(totalStr);
	this.totalseconds.toFixed(1);
	if (this.percent<0) this.percent=0;
	if (this.hour<0 ) this.hour=0;
	if (this.minute<0) this.minute=0;

	this.percentStr=this.ms2Time(this.totalseconds);
	//this.RefreshEnergy(this.totalseconds);
	//.toFixed(0);
	//this.percent= parseFloat(this.percent.toString()).toFixed(0);

//	console.log('seconds in 24hrs '+this.seconds);
//	console.log('seconds in 30min '+this.taskSeconds);

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
