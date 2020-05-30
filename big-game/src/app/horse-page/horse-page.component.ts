import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ColorService } from '../services/color.service';
import { BreedService } from '../services/breed.service';
import { UserData } from '../user-data';
import { UserDataService } from '../services/user-data.service';
import { HorseData } from '../horse-data';
import { HorseDataService} from '../services/horse-data.service';
import { HorsePageButtons } from '../horse-page-buttons';
import { AuthService } from '../services/auth.service';
import { Breed } from '../breed';
import { Color } from '../color';

@Component({
  selector: 'app-horse-page',
  templateUrl: './horse-page.component.html',
  styleUrls: ['./horse-page.component.css'],
})

export class HorsePageComponent implements OnInit {
	FeedButtons:HorsePageButtons=new HorsePageButtons;

	allSkills: string[];
	skill: string;
	allBreeds: Breed[];
	allColors: Color[];
	
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

 	public hour:number;
 	public minute:number;;

 	public percentStr:string;

 	public totalseconds:number;
	public user:UserData;
  
constructor(private router: ActivatedRoute, 
	private http: HttpClient,
	private colorService: ColorService, 
	private breedService: BreedService,
	private userDataService: UserDataService,
	private horseDataService: HorseDataService, private authService:AuthService) {	
	}

ngOnInit(): void {
	//setTimeout(() => 
    //{
		this.getBreeds();
		this.getColors();
		
		this.id = this.authService.getHorseId();
		this.getHorse();
		this.userDataService.getUserByID(this.authService.getUId()).subscribe(ref=> { 
			this.user=ref
		 });	
			console.log('got horse data');
	//}, 0);

	// streamline buttons code, not working on it right now, fixing other more important code

	this.FeedButtons.enabledImage='assets/images/horse-page-icons/feed-button-enabled.png';
	this.FeedButtons.disabledImage='assets/images/horse-page-icons/feed-button-enabled.png';
	this.FeedButtons.enabled=true;

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
	//this.imagePath = 'assets/images/horses/';
	this.imagePath=this.imageFile;

	this.hour=24;
	this.minute=0;
} // end of ngOnInit() function

getHorse(){
	setTimeout(() => 
	{
		this.horseDataService.getHorseById(this.id).subscribe(res => {
		this.horse = res as HorseData;
		console.log(this.horse);
  });
	}, 0);
}

ms2Time(ms:number):string {
    let secs = ms / 1000;
    ms = Math.floor(ms % 1000);
    let minutes = secs / 60;
    secs = Math.floor(secs % 60);
    let hours = minutes / 60;
    minutes = Math.floor(minutes % 60);
	hours = Math.floor(hours % 24);
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
    return hours + ":" + minutes + ":" + secs + "." + ms;
}

public FeedButton(){
	this.changeFeedButtons(this.FeedButtons,);
	// convert time to seconds then back again to display in circlur progress  bar
	this.seconds= (this.hour * 3600) + (this.minute * 60) ;
	this.taskSeconds= (0 * 3600)+(30 * 60);
	if (this.horse.energy==0) {
		alert("no energy left");
		return;
	}

	if (this.horse.energy>0) this.horse.energy-=5;
	// subtract seconds for 24hour period from how many seconds for task
	this.totalseconds=(this.seconds-this.taskSeconds);
	this.hour=this.totalseconds/3600;
	
	this.minute=(this.hour % 1);// * 60;
	this.minute=parseFloat(this.minute.toFixed(2));
	this.percent=parseFloat(this.percent.toFixed(0));
	this.seconds=parseFloat(this.seconds.toFixed(0));
	this.hour=this.hour-this.minute;
	this.hour=parseFloat(this.hour.toFixed(0));

	this.percent=(this.seconds-this.taskSeconds)/1000;

	let totalStr=this.totalseconds.toString();
	this.totalseconds=parseFloat(totalStr);
	this.totalseconds.toFixed(1);
	if (this.percent<0) this.percent=0;
	if (this.hour<0 ) this.hour=0;
	if (this.minute<0) this.minute=0;

	this.percentStr=this.ms2Time(this.totalseconds);

	// write data back to database
	this.horseDataService.setHorseEnergy(this.authService.getHorseId(),this.horse.energy);
}

public changeFeedButtons(button:HorsePageButtons){
button.enabled=!button.enabled;
	if (button.enabled){
			this.feedButton=button.enabledImage;
	}else {
			this.feedButton=button.disabledImage;
	}	
} // end of changeButtons() function

toggle() {
	if (this.ctrl.disabled) {
		this.ctrl.enable();
	} else {
		this.ctrl.disable();
	}
} // end of toggle() function

/*LoadHorseImage(){
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
*/

getBreeds(): Breed[] {
	this.breedService.getBreeds().subscribe((result) => {
	  this.allBreeds = result as Array<Breed>;
	});
	console.log(this.allBreeds);
	return this.allBreeds;
  }

  getColors(): Color[] {
	this.colorService.getColors().subscribe((result) => {
	  this.allColors = result as Array<Color>;
	});
	console.log(this.allColors);
	return this.allColors;
  }

public beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange_1' && $event.nextState === false) {
      $event.preventDefault();
    }
  } // end of beforeChange() function
} // end horse-page component class
