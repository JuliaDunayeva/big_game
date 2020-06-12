import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ColorService } from '../services/color.service';
import { BreedService } from '../services/breed.service';
import { UserData } from '../user-data';
import { UserDataService } from '../services/user-data.service';
import { HorseData } from '../horse-data';
import { HorseDataService } from '../services/horse-data.service';
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
	/* Care Tab Buttons */
  	FeedButtons: HorsePageButtons = new HorsePageButtons('feed');
  	DrinkButtons: HorsePageButtons = new HorsePageButtons('drink');
  	StrokeButtons: HorsePageButtons = new HorsePageButtons('stroke');
  	GroomButtons: HorsePageButtons = new HorsePageButtons('groom');
  	CarrotButtons: HorsePageButtons = new HorsePageButtons('carrot');
  	MashButtons: HorsePageButtons = new HorsePageButtons('mash');
	/* Empty Button*/
  	EmptyButtons:HorsePageButtons = new HorsePageButtons('empty');
	/* Ride Tab Buttons*/
  	ForestButtons:HorsePageButtons =new HorsePageButtons('forest');
  	MountainButtons:HorsePageButtons=new HorsePageButtons('mountain');
  	/* Competition Buttons */
  	BarrelCompButtons:HorsePageButtons=new HorsePageButtons('barrel');
  	CuttingCompButtons:HorsePageButtons=new HorsePageButtons('cutting');
  	TrailClassCompButtons:HorsePageButtons=new HorsePageButtons('trail');
  	ReignCompButtons:HorsePageButtons=new HorsePageButtons('reign');
  	WesternPleasureCompButtons:HorsePageButtons=new HorsePageButtons('western');
  	TrottingCompButtons:HorsePageButtons=new HorsePageButtons('trotting');
  	/* Breeding Tab Buttons*/
  	BreedingInfoButtons:HorsePageButtons=new HorsePageButtons('breedinginfo');
  	CoverMareButtons:HorsePageButtons=new HorsePageButtons('covermare');
	/* Declare temporary history Array */
  	public history:string[]=[];
	/* Declare Arrays for all the breeds and colors */  
	allBreeds: Breed[];
	allColors: Color[];
	  /* Local variable that holds current user selected horse */
 	public horse: HorseData = new HorseData;
	/* image path and file name for current user selected horse */
	img_file: string;
	img_path: string;
	/* Save horse id to local variable */
 	public id: string=this.authService.getHorseId();
/* Used to Collapse appropriate tabs on page */
  	public isRidesCollapsed = false;
  	public isCareCollapsed = false;
  	public isNightCollapsed = false;
  	public isTrainingCollapsed = false;
  	public isECCollapsed = false;
  	public isCompetitionCollapsed = false;
  	public isHistoryCollapsed = false;
  	public isBreedingCollapsed = false;
/* used by the Star Rating */
  	ctrl = new FormControl(null, Validators.required);
  	public readonly = true;
    	// Paths for horse images
  	public imagePath: string;
  	public imageFile: string;
	  // string for care tab button images
  	public feedButton: string;
  	public drinkButton: string;
  	public strokeButton: string;
  	public groomButton: string;
  	public carrotButton: string;
  	public mashButton: string;
  	// string for ride tab button images
  	public forestButton: string;
  	public mountainButton: string;
/* used to store image path for an empty button, for spacing */
  	public emptyButton: string;
/* used to store image path for competition buttons */
  	public BarrelCompButton:string;
  	public CuttingCompButton:string;
  	public TrailClassCompButton:string;
  	public ReignCompButton:string;
  	public WesternPleasureCompButton:string;

  	public BreedingInfoButton:string;
  	public CoverMareButton:string;
	//Buttons for night tab
  	public putToBedButton: string;
  	public ageButton: string;
	/* used to store percent, for the circular progress bar */
	public percent: number ;

  	public hours: number = 24;

  	public eq_reg_button:string='assets/images/horse-page-icons/eq-reg-button-enabled.png';
  	public items:string[]=[];

	  updatedTime: {currentHourString: string, currentMinuteString: string};

  	public user: UserData;

  	public timerId;

constructor(
    private router: ActivatedRoute,
    private http: HttpClient,
    private colorService: ColorService,
    private breedService: BreedService,
    private userDataService: UserDataService,
    private horseDataService: HorseDataService,
    private authService: AuthService,
) {}

ngOnInit(): void {
	// Item list array
    	this.items.push('assets/images/tack-page/gold-peramid.png');
    	this.items.push('assets/images/tack-page/gold-apple.png');

  // Get Breed and Coat Color information
    	this.getBreeds();
    	this.getColors();
// Get Currently selected Horse and User Information
	this.id = this.authService.getHorseId();
	this.getHorse();
    	this.userDataService
      		.getUserByID(this.authService.getUId())
      		.subscribe((ref) => {
        		this.user = ref;
	      });
       // streamline buttons code
    /* Define images for Competition Tab Buttons */
	this.BarrelCompButtons.enabledImage =      'assets/images/horse-page-icons/competition-barrel-racing-button-enabled.png';
    	this.BarrelCompButtons.disabledImage =      'assets/images/horse-page-icons/competition-barrel-racing-button-enabled.png';

    	this.CuttingCompButtons.enabledImage =      'assets/images/horse-page-icons/competition-cutting-button-enabled.png';
    	this.CuttingCompButtons.disabledImage =      'assets/images/horse-page-icons/competition-cutting-button-enabled.png';
    
    	this.TrailClassCompButtons.enabledImage =      'assets/images/horse-page-icons/competition-trail-class-button-enabled.png';
    	this.TrailClassCompButtons.disabledImage =      'assets/images/horse-page-icons/competition-trail-class-button-enabled.png';
    
    	this.ReignCompButtons.enabledImage =      'assets/images/horse-page-icons/competition-reining-button-enabled.png';
    	this.ReignCompButtons.disabledImage =      'assets/images/horse-page-icons/competition-reining-button-enabled.png';

    	this.WesternPleasureCompButtons.enabledImage =      'assets/images/horse-page-icons/competition-western-pleasure-button-enabled.png';
    	this.WesternPleasureCompButtons.disabledImage =      'assets/images/horse-page-icons/competition-western-pleasure-button-enabled.png';

    	this.TrottingCompButtons.enabledImage =      'assets/images/horse-page-icons/competition-trotting-button-enabled.png';
    	this.TrottingCompButtons.disabledImage =      'assets/images/horse-page-icons/competition-trotting-button-enabled.png';
/* Define images for Care Tab buttons */
    	this.FeedButtons.enabledImage =      'assets/images/horse-page-icons/feed-button-enabled.png';
    	this.FeedButtons.disabledImage =      'assets/images/horse-page-icons/feed-button-enabled.png';
    	this.setButtonDefaults(this.FeedButtons,30,0);
    	this.FeedButtons.energy=15;
    
    	this.DrinkButtons.enabledImage =      'assets/images/horse-page-icons/drink-button-enabled.png';
    	this.DrinkButtons.disabledImage =      'assets/images/horse-page-icons/drink-button-disabled.png';
    	this.DrinkButtons.energy=5;
    	this.setButtonDefaults(this.DrinkButtons,30,0);
    
    	this.StrokeButtons.enabledImage =      'assets/images/horse-page-icons/stroke-button-enabled.png';
    	this.StrokeButtons.disabledImage =      'assets/images/horse-page-icons/stroke-button-disabled.png';
    	this.setButtonDefaults(this.StrokeButtons,30,0);
    
    	this.GroomButtons.enabledImage =      'assets/images/horse-page-icons/groom-button-enabled.png';
    	this.GroomButtons.disabledImage =      'assets/images/horse-page-icons/groom-button-disabled.png';
	    //this.GroomButtons.energy=-15;
	this.GroomButtons.morale=5;
    	this.setButtonDefaults(this.GroomButtons,15,0);
    
    	this.CarrotButtons.enabledImage =      'assets/images/horse-page-icons/carrot-button-enabled.png';
    	this.CarrotButtons.disabledImage =      'assets/images/horse-page-icons/carrot-button-disabled.png';
    	this.setButtonDefaults(this.CarrotButtons,0,0);

    	this.MashButtons.enabledImage =      'assets/images/horse-page-icons/mash-button-enabled.png';
    	this.MashButtons.disabledImage =      'assets/images/horse-page-icons/mash-button-disabled.png';
    	this.setButtonDefaults(this.MashButtons,0,0);
/* Define images for Ride Tab buttons*/
    	this.ForestButtons.enabledImage =      'assets/images/horse-page-icons/forest-button-enabled.png';
    	this.ForestButtons.disabledImage =      'assets/images/horse-page-icons/forest-button-enabled.png';
    	this.ForestButtons.energy=-5;
    	this.ForestButtons.morale=10;
    	this.setButtonDefaults(this.ForestButtons,0,1);

    	this.MountainButtons.enabledImage =      'assets/images/horse-page-icons/mountain-button-enabled.png';
    	this.MountainButtons.disabledImage =      'assets/images/horse-page-icons/mountain-button-enabled.png';
    	this.MountainButtons.energy=-10;
    	this.MountainButtons.morale=15;
    	this.setButtonDefaults(this.MountainButtons,0,2);
      
    	this.BreedingInfoButtons.enabledImage = 'assets/images/horse-page-icons/breeding-information-button-enabled.png';
    	this.BreedingInfoButtons.disabledImage = 'assets/images/horse-page-icons/breeding-information-button-enabled.png';
    	this.BreedingInfoButtons.name='breedinginfo';
    	this.setButtonDefaults(this.BreedingInfoButtons,0,0);
    
    	this.CoverMareButtons.enabledImage = 'assets/images/horse-page-icons/breeding-cover-mare-button-disabled.png';
    	this.CoverMareButtons.disabledImage = 'assets/images/horse-page-icons/breeding-cover-mare-button-disabled.png';
    	this.CoverMareButtons.name='covermare';
    	this.setButtonDefaults(this.CoverMareButtons,0,0);
    /* Define image for empty placeholder button*/
    	this.EmptyButtons.enabledImage = 'assets/images/horse-page-icons/empty-button.png';
    	this.EmptyButtons.disabledImage = 'assets/images/horse-page-icons/empty-button.png';
    	this.setButtonDefaults(this.EmptyButtons,0,0);
      /* Care Tab buttons */
    	this.toggleButtons(this.FeedButtons,true);
    	this.toggleButtons(this.DrinkButtons,true);
    	this.toggleButtons(this.StrokeButtons,false);
    	this.toggleButtons(this.GroomButtons,false);
    	this.toggleButtons(this.CarrotButtons,false);
    	this.toggleButtons(this.MashButtons, false);
    	this.toggleButtons(this.EmptyButtons,false);
    /* Ride tab buttons */
    	this.toggleButtons(this.ForestButtons,false);
    	this.toggleButtons(this.MountainButtons,false);
    /* Breeding tab buttons */
	this.toggleButtons(this.BreedingInfoButtons, true);
    	this.toggleButtons(this.CoverMareButtons, true);
/* Competition tab buttons */
    	this.toggleButtons(this.BarrelCompButtons,false);
    	this.toggleButtons(this.CuttingCompButtons,false);
    	this.toggleButtons(this.WesternPleasureCompButtons,false);
    	this.toggleButtons(this.ReignCompButtons,false);
    	this.toggleButtons(this.TrailClassCompButtons,false);

    	this.imageFile = 'assets/images/horse-page-icons/test-horse-image.png';
	setTimeout(() => {
		/* Check energy and disable/enable appropriate buttons */
		this.checkEnergy();
  	}, 750);
} // end of ngOnInit() function
  // GetHorse function, used to get currently selected horse's data
  getHorse() {
      	this.horseDataService.getHorseById(this.id).subscribe((res) => {
        this.horse = res as HorseData;
        this.breedService.getBreedById(this.horse.breed).then( brd =>
            { 
		this.horse.breed = brd.data()['breed'];
		this.img_path = brd.data()['img_path'];
            //calculating percent for circle progress from database info
        	this.percent = Math.floor(
        	((Number(this.horse.time.currentHourString)*3600 
                 + Number(this.horse.time.currentMinuteString)*60)
        	) / 240 *(100/360))
            }
        )
        this.colorService.getColorById(this.horse.color).then( clr =>
        {
              this.horse.color = clr.data()['color'];
              this.img_file = clr.data()['img_file'];
              this.LoadHorseImage()
            }
        )
      });
/* This line sets an interval to refresh stuff, not working at the moment but will look into it*/
      //this.timerId = setInterval(this.alertFunc,1000);
    };
/* test callback function for setInterval line in above function */
public alertFunc(){
	//if (this.horse?.morale<100) 
	console.log(this.authService.getHorseId());
	//this.id=this.horse.id;
	//alert('not enough morale!');
}
/* Return number of seconds for specified about of hours and/or minutes */
  public returnSeconds(hr:number,min:number):number{
    	return (hr * 3600) + (min * 60);
  }
// Drink Button fucntion
public DrinkButton() {
    	this.history.unshift(this.horse.name+" is taking a drink");
    	//this.toggleButtons(this.DrinkButtons, 'drink',true);
    	this.horse.energy=this.horse.energy+this.DrinkButtons.energy;
    	if (this.horse.energy>100) this.horse.energy=100;
    	this.percent = this.horseDataService.updateHorseTime(this.horse.time, this.DrinkButtons.hour, this.DrinkButtons.minute);
    	this.horseDataService.setHorseEnergy(this.horse);
	if (this.horse.energy==100){
        	this.toggleButtons(this.DrinkButtons,false);
	}
    	if(this.horse.energy>0){
              //this.toggleButtons(this.DrinkButtons,'drink',true);
              this.toggleButtons(this.GroomButtons,true);      
    	}
}// end of Drink Button function

  // Stroke Button function
public StrokeButton() {
    this.history.unshift("Stroking "+this.horse.name);
    //this.toggleButtons(this.StrokeButtons, 'stroke',true);
} // end of Stroke Button function

  // Groom Button function
public GroomButton() {
	if (this.horse.morale == 100) {
      		alert('morale is maxed out');
		this.toggleButtons(this.GroomButtons,false);
		return;
	}
	this.percent = this.horseDataService.updateHorseTime(this.horse.time, this.GroomButtons.hour, this.GroomButtons.minute);
	this.history.unshift("Grooming " + this.horse.name);
    
    	if (this.horse.morale > 0) this.horse.morale = this.horse.morale + this.GroomButtons.morale;
    	if (this.horse.morale>100) this.horse.morale=100;
      	this.horseDataService.setHorseMorale(this.horse);
    //this.toggleButtons(this.GroomButtons, 'groom',true);
  } // end of Groom Button function

  // Carrot Button function
public CarrotButton() {
	this.history.unshift(this.horse.name+" ate a carrot");
    //this.toggleButtons(this.CarrotButtons, 'carrot',true);
}// end of Carrot Button function

  // Mash button function
public MashButton() {
	this.toggleButtons(this.MashButtons, true);
}// end of Mash Button function

  // Feed Button function
public FeedButton() {
	let totalseconds=0;
    	if (!this.FeedButtons.enabled){
      		alert('No energy to feed.');
      		return;
    	}
    	this.history.unshift("Feeding "+this.horse.name);
    //this.toggleButtons(this.FeedButtons, 'feed',true);
     	this.horse.energy= this.horse.energy+this.FeedButtons.energy;
	if (this.horse.energy>100) this.horse.energy=100;
	this.percent = this.horseDataService.updateHorseTime(this.horse.time, this.FeedButtons.hour, this.FeedButtons.minute);
/* Check energy and disable/enable appropriate buttons */
  	this.checkEnergy();
/* write data back to database */
    	this.horseDataService.setHorseEnergy(this.horse);
  } //end of Feed Button function

public ForestButton(){
	if (this.horse.energy == 0) {
    		alert('no energy left');
    		this.toggleButtons(this.ForestButtons,false);
    		return;
  	}
  	this.percent = this.horseDataService.updateHorseTime(this.horse.time, this.ForestButtons.hour, this.ForestButtons.minute);
  	this.history.unshift(this.horse.name + " is taking a ride in the forest");
	  
	if (this.horse.energy > 0) this.horse.energy =this.horse.energy+this.ForestButtons.energy;
  	if (this.horse.morale > 0) this.horse.morale =this.horse.morale+this.ForestButtons.morale;
  	if (this.horse.energy>100) this.horse.energy=100;
	if (this.horse.morale>100) this.horse.morale=100;
	  /* Check energy and disable/enable appropriate buttons */
	this.checkEnergy();
	/* write data back to database */
  	this.horseDataService.setHorseEnergy(this.horse);
  	this.horseDataService.setHorseMorale(this.horse);
  //this.toggleButtons(this.ForestButtons, 'forest',true);   
}

public MountainButton(){
	if (this.horse.energy == 0) {
    		alert('no energy left');
    		this.toggleButtons(this.MountainButtons,false);
    		return;
  	}
  	this.percent = this.horseDataService.updateHorseTime(this.horse.time, this.MountainButtons.hour, this.MountainButtons.minute);
  	this.history.unshift(this.horse.name + " is taking a ride in the mountains");
  	if (this.horse.energy > 0) this.horse.energy =this.horse.energy+this.MountainButtons.energy;
  	if (this.horse.morale > 0) this.horse.morale =this.horse.morale+this.MountainButtons.morale;
  	if (this.horse.energy>100) this.horse.energy=100;
  	if (this.horse.morale>100) this.horse.morale=100;

  	if (this.horse.energy<0){
    		this.horse.energy=0;
	}
/* Check energy and disable/enable appropriate buttons */
	this.checkEnergy();
	/* write data back to database */
  	this.horseDataService.setHorseEnergy(this.horse);
  	this.horseDataService.setHorseMorale(this.horse);
    //this.toggleButtons(this.ForestButtons, 'forest',true);   
}
/* used to check energy and other stats and disable/enable appropriate buttons */
public checkEnergy(){
	if (this.horse.energy<50) this.horse.morale-5;
	    
	if (this.horse.energy==100){
      		this.toggleButtons(this.DrinkButtons,false);
      		this.toggleButtons(this.GroomButtons,true);
      		this.toggleButtons(this.ForestButtons,true);
      		this.toggleButtons(this.ForestButtons,true);
      		this.toggleButtons(this.MountainButtons,true);
    	}
    	if(this.horse.energy>0 && this.horse.energy<100){
      		this.toggleButtons(this.DrinkButtons,true)
      		this.toggleButtons(this.GroomButtons,true);
      		this.toggleButtons(this.ForestButtons,true);
      		this.toggleButtons(this.ForestButtons,true);
      		this.toggleButtons(this.MountainButtons,true);
    	}
    	if(this.horse.energy==0){
      		this.toggleButtons(this.DrinkButtons,true)
      		this.toggleButtons(this.GroomButtons,false);
      		this.toggleButtons(this.ForestButtons,false);
      		this.toggleButtons(this.ForestButtons,false);
      		this.toggleButtons(this.MountainButtons,false);
    	}
  }
/* Used to set default hours and/or minutes that each button will take/add from current horse time when clicked */
public setButtonDefaults(button : HorsePageButtons,min:number,hour:number){
    	button.minute=min;
    	button.hour=hour;
}
  /* Toggle buttons function
      Parameters: 
      button -> HorsePageButtons Class
      buttonChange -> string name of which button to change
      toggle -> boolean, true or false to enable or disable button
  */
public toggleButtons(button: HorsePageButtons, toggle:boolean) {
      //button.enabled = !button.enabled;
	button.enabled=toggle;
    	let buttonChange=button.name;
    	switch (buttonChange) {
      		case 'feed':
        		if (button.enabled) {
		        	this.feedButton = button.enabledImage;
	        	} else {
	          		this.feedButton = button.disabledImage;
        		}
        		break;
      		case 'drink':
        		if (button.enabled) {
          			this.drinkButton = button.enabledImage;
        		} else {
          			this.drinkButton = button.disabledImage;
        		}
        		break;
		case 'stroke':
        		if (button.enabled) {
          			this.strokeButton = button.enabledImage;
        		} else {
          			this.strokeButton = button.disabledImage;
        		}
        		break;
      		case 'groom':
        		if (button.enabled) {
          			this.groomButton = button.enabledImage;
        		} else {
          			this.groomButton = button.disabledImage;
        		}
        		break;
      		case 'carrot':
        		if (button.enabled) {
          			this.carrotButton = button.enabledImage;
        		} else {
          			this.carrotButton = button.disabledImage;
        		}
        		break;
      		case 'mash':
        		if (button.enabled) {
          			this.mashButton = button.enabledImage;
        		} else {
          			this.mashButton = button.disabledImage;
        		}
        		break;
        	case 'forest':
        		if (button.enabled) {
          			this.forestButton = button.enabledImage;
        		} else {
          			this.forestButton = button.disabledImage;
        		}
        		break;
        	case 'mountain':
        		if (button.enabled) {
          			this.mountainButton = button.enabledImage;
        		} else {
          			this.mountainButton = button.disabledImage;
        		}
        		break;
        	case 'empty':
        		if (button.enabled) {
          			this.emptyButton = button.enabledImage;
        		} else {
          			this.emptyButton = button.disabledImage;
        		}
        		break;
        	case 'breedinginfo':
          		if (button.enabled) {
            			this.BreedingInfoButton = button.enabledImage;
          		} else {
            			this.BreedingInfoButton = button.disabledImage;
          		}
          		break;
          	case 'covermare':
          		if (button.enabled) {
            			this.CoverMareButton = button.enabledImage;
          		} else {
            			this.CoverMareButton = button.disabledImage;
          		}
          		break;
          	case 'barrel':
          		if (button.enabled) {
            			this.BarrelCompButton = button.enabledImage;
          		} else {
            			this.BarrelCompButton = button.disabledImage;
          		}
          		break;
          	case 'cutting':
          		if (button.enabled) {
            			this.CuttingCompButton = button.enabledImage;
          		} else {
            			this.CuttingCompButton = button.disabledImage;
          		}
          		break;
          	case 'trail':
          		if (button.enabled) {
            			this.TrailClassCompButton = button.enabledImage;
          		} else {
            			this.TrailClassCompButton = button.disabledImage;
          		}
          		break;
          	case 'reign':
          		if (button.enabled) {
            			this.ReignCompButton = button.enabledImage;
          		} else {
            			this.ReignCompButton = button.disabledImage;
          		}
          		break;
          	case 'western':
          		if (button.enabled) {
            			this.WesternPleasureCompButton = button.enabledImage;
          		} else {
            			this.WesternPleasureCompButton = button.disabledImage;
          		}
          		break;
     }
}
/* toggle function for enabling and disabling of rating star changing */
toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
} // end of toggle() function

  // Load Horse Image function
LoadHorseImage() {
	this.imagePath = 'assets/images/horses/';
	this.imagePath += `${this.img_path}/${this.img_file}`
} // end of LoadHorseImage() function
    
  // GetBreeds function, used to get the breed image file for horse
public getBreeds() {
	this.breedService.getBreeds().subscribe((brd) => {
        this.allBreeds = brd.map(res => {
        	return {
            		id: res.payload.doc.id,
            		breed: res.payload.doc.data()['breed'],
            		skill: res.payload.doc.data()['skill'],
            		img_path: res.payload.doc.data()['img_path']
          		}
        	});
      });
}// end of GetBreeds function
  
    // GetColors function, used to get coat color image file for horse
getColors() {
	this.colorService.getColors().subscribe(clr => {
      	this.allColors = clr.map(res => {
	        return {
	          	id: res.payload.doc.id,
          		color: res.payload.doc.data()['color'],
          		img_file: res.payload.doc.data()['img_file']
        		}
      		});
    	});
} // end of getColors function
} // end horse-page component class