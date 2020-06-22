import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute,  Router } from '@angular/router';
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
import { TackItems } from '../tack-items';
import { Training } from '../training';
//import { ModalOptionsComponent } from '../modal-options/modal-options.component';
import { Equipment } from '../equipment';
import { SaddlesService } from './../services/saddles.service';

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
		EmptyButtons: HorsePageButtons = new HorsePageButtons('empty');
	/* Ride Tab Buttons*/
  		ForestButtons:HorsePageButtons = new HorsePageButtons('forest');
  		MountainButtons:HorsePageButtons = new HorsePageButtons('mountain');
  	/* Competition Buttons */
  		BarrelCompButtons:HorsePageButtons = new HorsePageButtons('barrel');
  		CuttingCompButtons:HorsePageButtons = new HorsePageButtons('cutting');
  		TrailClassCompButtons:HorsePageButtons = new HorsePageButtons('trail');
  		ReignCompButtons:HorsePageButtons = new HorsePageButtons('reign');
  		WesternPleasureCompButtons:HorsePageButtons = new HorsePageButtons('western');
  		TrottingCompButtons:HorsePageButtons = new HorsePageButtons('trotting');
  	/* Breeding Tab Buttons*/
  		BreedingInfoButtons:HorsePageButtons = new HorsePageButtons('breedinginfo');
		CoverMareButtons:HorsePageButtons = new HorsePageButtons('covermare');
	  
		PutToBedButtons:HorsePageButtons = new HorsePageButtons('bed');
		AgeButtons:HorsePageButtons = new HorsePageButtons('age');
	/* Declare temporary history Array */
  		public history:string[] = [];
	/* Declare Arrays for all the breeds and colors */  
		allBreeds: Breed[];
		allColors: Color[];
	  /* Local variable that holds current user selected horse */
		public horse: HorseData = new HorseData;
	/* image path and file name for current user selected horse */
		img_file: string;
		img_path: string;
	/* Save horse id to local variable */
 		public id: string = this.authService.getHorseId();
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
  		public BarrelCompButton: string;
  		public CuttingCompButton: string;
  		public TrailClassCompButton: string;
  		public ReignCompButton: string;
  		public WesternPleasureCompButton: string;

  		public BreedingInfoButton: string;
  		public CoverMareButton: string;
	//Buttons for night tab
		public putToBedButton: string;
		public ageButton: string;
	/* used to store percent, for the circular progress bar */
		public percent: number ;

  		public eq_reg_button:string = 'assets/images/horse-page-icons/eq-reg-button-enabled.png';
		public items: TackItems[]=[];  
		public training: Training[]=[];
		//public items:string[] = [];

		updatedTime: {currentHourString: string, currentMinuteString: string};

  		public user: UserData;

		public timerId;
		
		private item: TackItems;
		private train: Training;

		public index:number;
		
		allEquipment: Equipment[];
		currentSaddle:Equipment;
		currentBridal:Equipment;
		currentSaddleBlanket:Equipment;
		public saddleIndex=1;
		
constructor(
    private router: Router,
    private http: HttpClient,
    private colorService: ColorService,
    private breedService: BreedService,
    private userDataService: UserDataService,
    private horseDataService: HorseDataService,
	private authService: AuthService, router2:Router,
	public saddlesService: SaddlesService,
	//private mod: ModalOptionsComponent,
) {}

ngOnInit(): void {
	this.GetEquipmentList();
	//this.currentBridal=this.allEquipment[1];
	//this.currentSaddle=this.allEquipment[1];
	//this.currentSaddleBlanket=this.allEquipment[1];
//this.mod.showlist();
	//setTimeout(function(){}, 750); 
	// Item list array
		this.item=new TackItems("Golden Apple","assets/images/tack-page/gold-apple.png");
		this.items.push(this.item);
		this.item=new TackItems("Golden Peramid","assets/images/tack-page/gold-peramid.png");
		this.items.push(this.item);
		// setup training items list
		this.train=new Training("Barrel Racing","assets/images/horse-page-icons/training-complete.png","assets/images/horse-page-icons/training-incomplete.png");
		this.train.setPercent(0);
		this.training.push(this.train);
		this.train=new Training("Training 2","assets/images/horse-page-icons/training-complete.png","assets/images/horse-page-icons/training-incomplete.png");
		this.train.setPercent(50);
		this.training.push(this.train);
		this.train=new Training("Training 3","assets/images/horse-page-icons/training-complete.png","assets/images/horse-page-icons/training-incomplete.png");
		this.train.setPercent(75);
		this.training.push(this.train);
		//console.log(this.items);
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
		this.setButtonTimeDefaults(this.BarrelCompButtons, 1, 0)

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
    	this.FeedButtons.disabledImage =      'assets/images/horse-page-icons/empty-button.png';
    	this.setButtonTimeDefaults(this.FeedButtons, 0, 30);
    	this.FeedButtons.energy = 15;
    
    	this.DrinkButtons.enabledImage =      'assets/images/horse-page-icons/drink-button-enabled.png';
    	this.DrinkButtons.disabledImage =      'assets/images/horse-page-icons/drink-button-disabled.png';
    	this.DrinkButtons.energy = 5;
    	this.setButtonTimeDefaults(this.DrinkButtons, 0, 30);
    
    	this.StrokeButtons.enabledImage =      'assets/images/horse-page-icons/stroke-button-enabled.png';
    	this.StrokeButtons.disabledImage =      'assets/images/horse-page-icons/stroke-button-disabled.png';
    	this.setButtonTimeDefaults(this.StrokeButtons, 0, 30);
    
    	this.GroomButtons.enabledImage =      'assets/images/horse-page-icons/groom-button-enabled.png';
    	this.GroomButtons.disabledImage =      'assets/images/horse-page-icons/groom-button-disabled.png';
	    //this.GroomButtons.energy=-15;
		this.GroomButtons.morale=5;
    	this.setButtonTimeDefaults(this.GroomButtons, 0, 30);
    
    	this.CarrotButtons.enabledImage =      'assets/images/horse-page-icons/carrot-button-enabled.png';
    	this.CarrotButtons.disabledImage =      'assets/images/horse-page-icons/carrot-button-disabled.png';
    	this.setButtonTimeDefaults(this.CarrotButtons, 0, 0);

    	this.MashButtons.enabledImage =      'assets/images/horse-page-icons/mash-button-enabled.png';
    	this.MashButtons.disabledImage =      'assets/images/horse-page-icons/mash-button-disabled.png';
    	this.setButtonTimeDefaults(this.MashButtons, 0, 0);
/* Define images for Ride Tab buttons*/
    	this.ForestButtons.enabledImage =      'assets/images/horse-page-icons/forest-button-enabled.png';
    	this.ForestButtons.disabledImage =      'assets/images/horse-page-icons/forest-button-enabled.png';
    	this.ForestButtons.energy = -5;
    	this.ForestButtons.morale = 10;
    	this.setButtonTimeDefaults(this.ForestButtons, 1, 0);

    	this.MountainButtons.enabledImage =      'assets/images/horse-page-icons/mountain-button-enabled.png';
    	this.MountainButtons.disabledImage =      'assets/images/horse-page-icons/mountain-button-enabled.png';
    	this.MountainButtons.energy = -10;
    	this.MountainButtons.morale = 15;
    	this.setButtonTimeDefaults(this.MountainButtons, 2, 0);
      
    	this.BreedingInfoButtons.enabledImage = 'assets/images/horse-page-icons/breeding-information-button-enabled.png';
    	this.BreedingInfoButtons.disabledImage = 'assets/images/horse-page-icons/breeding-information-button-enabled.png';
    	this.BreedingInfoButtons.name='breedinginfo';
    	this.setButtonTimeDefaults(this.BreedingInfoButtons, 0, 0);
    
    	this.CoverMareButtons.enabledImage = 'assets/images/horse-page-icons/breeding-cover-mare-button-disabled.png';
		this.CoverMareButtons.disabledImage = 'assets/images/horse-page-icons/empty-button.png';
		//breeding-cover-mare-button-disabled.
    	this.CoverMareButtons.name='covermare';
    	this.setButtonTimeDefaults(this.CoverMareButtons, 0, 0);
    /* Define image for empty placeholder button*/
    	this.EmptyButtons.enabledImage = 'assets/images/horse-page-icons/empty-button.png';
    	this.EmptyButtons.disabledImage = 'assets/images/horse-page-icons/empty-button.png';
		this.setButtonTimeDefaults(this.EmptyButtons, 0, 0);

		this.PutToBedButtons.enabledImage = 'assets/images/horse-page-icons/put-to-bed-disabled.png';
    	this.PutToBedButtons.disabledImage = 'assets/images/horse-page-icons/put-to-bed-enabled.png';
		this.setButtonTimeDefaults(this.PutToBedButtons, 0, 0);

		this.AgeButtons.enabledImage = 'assets/images/horse-page-icons/age-button-enabled.png';
    	this.AgeButtons.disabledImage = 'assets/images/horse-page-icons/age-button-disabled.png';
		this.setButtonTimeDefaults(this.AgeButtons, 24, 0);
		
      /* Care Tab buttons */
    	this.toggleButtons(this.FeedButtons, true);
    	this.toggleButtons(this.DrinkButtons, true);
    	this.toggleButtons(this.StrokeButtons, true);
    	this.toggleButtons(this.GroomButtons, false);
    	this.toggleButtons(this.CarrotButtons, false);
    	this.toggleButtons(this.MashButtons, false);
		this.toggleButtons(this.EmptyButtons, false);
	/*Night tab Buttons */
		this.toggleButtons(this.PutToBedButtons, false);
		this.toggleButtons(this.AgeButtons, true);
    /* Ride tab buttons */
    	this.toggleButtons(this.ForestButtons, false);
    	this.toggleButtons(this.MountainButtons, false);
    /* Breeding tab buttons */
		this.toggleButtons(this.BreedingInfoButtons, true);
		//this.toggleButtons(this.CoverMareButtons, true);
		
/* Competition tab buttons */
    	this.toggleButtons(this.BarrelCompButtons, false);
    	this.toggleButtons(this.CuttingCompButtons, false);
    	this.toggleButtons(this.WesternPleasureCompButtons, false);
    	this.toggleButtons(this.ReignCompButtons, false);
    	this.toggleButtons(this.TrailClassCompButtons, false);
		this.checkButtons();	
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
		//if (this.horse.gender=='mare') this.CoverMareButtons.enabled=true;
		this.checkButtons();
		this.updateEnergyBar();
		this.updateHealthBar();
		this.updateMoraleBar();
		/* This line sets an interval to refresh stuff, not working at the moment but will look into it*/
	//this.timerId = setInterval(this.alertFunc(this.horse),1000);
	  });

	  
	  //console.log(this.id);
	  //console.log(this.horse.id);
    } // end of GetHorse() function
/* test callback function for setInterval line in above function */
alertFunc(myhorse: HorseData):any{
		//console.log(myhorse);
		myhorse.energy--;
		this.updateEnergyBar();
}
/* Return number of seconds for specified about of hours and/or minutes */
public returnSeconds(hr: number,min: number): number{
    	return (hr * 3600) + (min * 60);
}
// Drink Button fucntion
public DrinkButton() {
		if (this.horse.energy==100){
			alert(this.horse.name + ' is full');
			this.toggleButtons(this.DrinkButtons,false);
			return
		}
    	this.history.unshift( " is taking a drink");
    	//this.toggleButtons(this.DrinkButtons, 'drink',true);
    	this.horse.energy=this.horse.energy + this.DrinkButtons.energy;
		this.CheckStats();
		//if (this.horse.energy > 100) this.horse.energy = 100;
    	this.percent = this.horseDataService.updateHorseTime(this.horse.time,this.horse.age, this.DrinkButtons.hour, this.DrinkButtons.minute);
		this.horseDataService.setHorseEnergy(this.horse);
		this.updateEnergyBar();
		this.checkButtons();
}// end of Drink Button function

  // Stroke Button function
public StrokeButton() {
		if (!this.StrokeButtons.enabled){
			alert('no need to stroke the beast');
			return;
		}
	    this.history.unshift(' is getting stroked');
	    this.checkButtons();
    //this.toggleButtons(this.StrokeButtons, 'stroke',true);
} // end of Stroke Button function

  // Groom Button function
public GroomButton() {
		if (this.horse.morale == 100) {
      		alert('morale is maxed out');
			this.toggleButtons(this.GroomButtons, false);
			return;
		}
		this.percent = this.horseDataService.updateHorseTime(this.horse.time, this.horse.age, this.GroomButtons.hour, this.GroomButtons.minute);
		this.history.unshift(" is bieng Groomed");
    
    	if (this.horse.morale > 0) this.horse.morale = this.horse.morale + this.GroomButtons.morale;
		this.CheckStats();
		//if (this.horse.morale > 100) this.horse.morale = 100;
		this.horseDataService.setHorseMorale(this.horse);
		this.updateMoraleBar();
		this.checkButtons();
    //this.toggleButtons(this.GroomButtons, 'groom',true);
  } // end of Groom Button function
 
  // Carrot Button function
public CarrotButton() {
		if (!this.CarrotButtons.enabled) {
			alert('Have no carrots.');
			return;
		}
		this.history.unshift(" ate a carrot");
		this.toggleButtons(this.CarrotButtons, !this.CarrotButtons.enabled)
		this.checkButtons();
    //this.toggleButtons(this.CarrotButtons, 'carrot',true);
}// end of Carrot Button function

  // Mash button function
public MashButton() {
		this.toggleButtons(this.MashButtons, !this.MashButtons.enabled);
		this.checkButtons();
		this.returnCurrentSaddle();
		this.currentBridal=this.allEquipment[1];
	this.currentSaddle=this.allEquipment[1];
	this.currentSaddleBlanket=this.allEquipment[1];
}// end of Mash Button function


public PutToBedButton() {
		if (this.horse.energy>99){
			alert(this.horse.name + ' doesnt need anymore rest.');
			this.toggleButtons(this.PutToBedButtons, false);
			return;
  		}
  		this.history.unshift(' is resting');
		if (this.horse.health<100) this.horse.health=100;
		if (this.horse.morale<100) this.horse.morale=100;
		if (this.horse.energy<100) this.horse.energy=100;
		this.CheckStats();

	//this.toggleButtons(this.PutToBedButtons, !this.PutToBedButtons.enabled);
		this.horseDataService.setHorseHealth(this.horse);
		this.horseDataService.setHorseMorale(this.horse);	
		this.horseDataService.setHorseEnergy(this.horse);
		this.updateHealthBar()
		this.updateEnergyBar()
		this.updateMoraleBar()
		this.checkButtons();
}// end of Put to bed Button function

public AgeButton() {
		this.toggleButtons(this.AgeButtons, !this.AgeButtons.enabled);
		this.percent = this.horseDataService.updateHorseTime(this.horse.time, this.horse.age, this.AgeButtons.hour, this.AgeButtons.minute);
		this.horseDataService.setHorseTime(this.horse, '24', '00');
		this.checkButtons();
}// end of Age Button function

  // Feed Button function
public FeedButton() {
		let totalseconds = 0;
    	if (this.horse.energy>99){
		      alert(this.horse.name + ' is full.');
		      this.toggleButtons(this.FeedButtons, false);
      		return;
    	}
    	this.history.unshift(" is eating");
    //this.toggleButtons(this.FeedButtons, 'feed',true);
     	this.horse.energy= this.horse.energy + this.FeedButtons.energy;
	//if (this.horse.energy > 100) this.horse.energy = 100;
		this.percent = this.horseDataService.updateHorseTime(this.horse.time, this.horse.age, this.FeedButtons.hour, this.FeedButtons.minute);
/* Check energy and disable/enable appropriate buttons */
		this.CheckStats();
/* write data back to database */
		this.horseDataService.setHorseEnergy(this.horse);
		this.updateEnergyBar();
		this.checkButtons();
	//this.updatePercent('myBar', this.horse.energy);
	  } //end of Feed Button function

public ForestButton(){
		this.checkButtons();
		if (this.horse.energy < 1) {
    		alert('no energy left');
    		this.toggleButtons(this.ForestButtons,false);
    		return;
  		}
  		this.percent = this.horseDataService.updateHorseTime(this.horse.time, this.horse.age, this.ForestButtons.hour, this.ForestButtons.minute);
  		this.history.unshift(" is taking a ride in the forest");
	  
		if (this.horse.energy > 0) this.horse.energy = this.horse.energy  + this.ForestButtons.energy;
  		if (this.horse.morale > 0) this.horse.morale = this.horse.morale + this.ForestButtons.morale;
  	//if (this.horse.energy > 100) this.horse.energy = 100;
	//if (this.horse.morale > 100) this.horse.morale = 100;
	  /* Check energy and disable/enable appropriate buttons */
	  	this.CheckStats();
	
	/* write data back to database */
  		this.horseDataService.setHorseEnergy(this.horse);
		this.horseDataService.setHorseMorale(this.horse);
		this.updateEnergyBar();
		this.updateMoraleBar();
  //this.toggleButtons(this.ForestButtons, 'forest',true);   
}

public MountainButton(){
		this.checkButtons();
		if (this.horse.energy < 1) {
    		alert('no energy left');
    		this.toggleButtons(this.MountainButtons,false);
    		return;
  		}
  		this.percent = this.horseDataService.updateHorseTime(this.horse.time, this.horse.age, this.MountainButtons.hour, this.MountainButtons.minute);
  		this.history.unshift( " is taking a ride in the mountains");
  		if (this.horse.energy > 0) this.horse.energy =this.horse.energy + this.MountainButtons.energy;
  		if (this.horse.morale > 0) this.horse.morale =this.horse.morale + this.MountainButtons.morale;
  	//if (this.horse.energy > 100) this.horse.energy = 100;
  	//if (this.horse.morale > 100) this.horse.morale = 100;

  	//if (this.horse.energy < 0){
    		//this.horse.energy = 0;
	//}
/* Check energy and disable/enable appropriate buttons */
		this.CheckStats();
	/* write data back to database */
  		this.horseDataService.setHorseEnergy(this.horse);
		this.horseDataService.setHorseMorale(this.horse);
		this.updateEnergyBar();
		this.updateMoraleBar();
    //this.toggleButtons(this.ForestButtons, 'forest',true);   
}

public BarrelComp(){
		if (this.horse.energy==0) {
			alert('no energy to enter competition');
			return;
		}
		this.history.unshift(' is Competing in a Barrel Race Competition');
		if (this.horse.health>0 ) this.horse.health-=1;
		if (this.horse.morale>0) this.horse.morale-=5;
		if (this.horse.energy>0) this.horse.energy-=5;
		if (this.training[0].getPercent()<100) this.training[0].setPercent(this.training[0].getPercent()+10)
		this.CheckStats();
		this.horseDataService.setHorseHealth(this.horse);
		this.horseDataService.setHorseMorale(this.horse);	
		this.horseDataService.setHorseEnergy(this.horse);
		this.updateHealthBar()
		this.updateEnergyBar()
		this.updateMoraleBar()
}

public CuttingComp(){
		this.history.unshift(' is Competing in a Cutting Competition');
}

public TrailComp(){
		this.history.unshift(' is Competing in a Trail Ride Competition');
}

public ReignComp(){
		this.history.unshift(' is Competing in a Reign Competition');
}

public WesternPleasureComp(){
		this.history.unshift(' is Competing in a Western Pleasure Competition');
}

public coverMareButton(){
	if (this.horse.gender=='mare'){
		alert('mare');
		this.router.navigate(['breeding'])
	}
	if (this.horse.gender=='stallion'){
		alert('stallion');
	}
}

public CheckStats(){
		if (this.horse.energy>100) this.horse.energy=100;
		if (this.horse.morale>100) this.horse.morale=100;
		if (this.horse.health>100) this.horse.health=100;
		if(this.horse.energy<0) this.horse.energy=0;
		if (this.horse.morale<0) this.horse.morale=0;
		if (this.horse.health<0) this.horse.health=0;
}
/* used to check energy and other stats and disable/enable appropriate buttons */
public checkButtons(){
		if (this.horse.energy < 50) this.horse.morale - 5;

		if (this.horse.gender=="mare") {
			this.toggleButtons(this.CoverMareButtons,true);
		} else 	{
		 	this.toggleButtons(this.CoverMareButtons,false);
		}

		if (this.horse.energy == 100){
			this.toggleButtons(this.FeedButtons,false);
			this.toggleButtons(this.PutToBedButtons, false);
      		this.toggleButtons(this.DrinkButtons, false);
      		this.toggleButtons(this.GroomButtons, true);
      		this.toggleButtons(this.ForestButtons, true);
      		this.toggleButtons(this.ForestButtons, true);
      		this.toggleButtons(this.MountainButtons, true);
    	}
    	if(this.horse.energy > 1 && this.horse.energy < 99){
			this.toggleButtons(this.FeedButtons, true) ;    
			this.toggleButtons(this.DrinkButtons, true);
      		this.toggleButtons(this.GroomButtons, true);
      		this.toggleButtons(this.ForestButtons, true);
      		this.toggleButtons(this.ForestButtons, true);
      		this.toggleButtons(this.MountainButtons, true);
    	}
    	if(this.horse.energy == 0){
			this.toggleButtons(this.FeedButtons, true);      
			this.toggleButtons(this.DrinkButtons, true);
      		this.toggleButtons(this.GroomButtons, false);
      		this.toggleButtons(this.ForestButtons, false);
      		this.toggleButtons(this.ForestButtons, false);
			this.toggleButtons(this.MountainButtons, false);
			this.toggleButtons(this.PutToBedButtons, true);
	    }
		if(this.horse.morale > 1 && this.horse.morale < 99){
			this.toggleButtons(this.GroomButtons, true);
		}
		if(this.horse.morale > 99){
			this.toggleButtons(this.GroomButtons, false);
		}
  }
/* Used to set default hours and/or minutes that each button will take/add from current horse time when clicked */
public setButtonTimeDefaults(button : HorsePageButtons, hour: number, min: number){
    	button.minute = min;
    	button.hour = hour;
}
  /* Toggle buttons function
      Parameters: 
      button -> HorsePageButtons Class
      buttonChange -> string name of which button to change
      toggle -> boolean, true or false to enable or disable button
  */
public toggleButtons(button: HorsePageButtons, toggle: boolean) {
      //button.enabled = !button.enabled;
		button.enabled = toggle;
    	let buttonChange = button.name;
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
			case 'bed':
					if (button.enabled) {
						  this.putToBedButton = button.enabledImage;
					} else {
						  this.putToBedButton = button.disabledImage;
					}
					break;
			case 'age':
					if (button.enabled) {
						  this.ageButton = button.enabledImage;
					} else {
						  this.ageButton = button.disabledImage;
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

updateEnergyBar(){
		let elem = document.getElementById('energyBar');
		elem.style.width = this.horse.energy + "%";
}
updateHealthBar(){
		let elem = document.getElementById('healthBar');
		elem.style.width = this.horse.health + "%";  
}
updateMoraleBar(){
	let elem = document.getElementById('moraleBar');
	elem.style.width = this.horse.morale + "%";
}
returnCurrentSaddle(){
	for (let i=0; i< this.allEquipment.length;i++){
		//console.log(this.allEquipment[i].name)
	}
}
/* Functions used by HTML to calculate each new stat based on equipment, currently only applies to a specific saddle for testing */
calculateJumpSkill(){
	return this.horse.jumping+ this.allEquipment[this.saddleIndex].jumping_;
	//return this.horse.jumping+ this.currentBridal.jumping_ + this.currentSaddle.jumping_ + this.currentSaddleBlanket.jumping_;
}
calculateStaminaSkill(){
	return this.horse.stamina+ this.allEquipment[this.saddleIndex].stamina_;
	//return this.horse.stamina+ this.currentBridal.stamina_ + this.currentSaddle.stamina_ + this.currentSaddleBlanket.stamina_;
}
calculateSpeedSkill(){
	return this.horse.speed+ this.allEquipment[this.saddleIndex].speed_;
	//return this.horse.speed+ this.currentBridal.speed_ + this.currentSaddle.speed_ + this.currentSaddleBlanket.speed_;
}
calculateDressageSkill(){
	return this.horse.dressage+ this.allEquipment[this.saddleIndex].dressage_;
	//return this.horse.dressage+ this.currentBridal.dressage_ + this.currentSaddle.dressage_ + this.currentSaddleBlanket.dressage_;
}
calculateGallopSkill(){
	return this.horse.gallop+ this.allEquipment[this.saddleIndex].gallop_;
	//return this.horse.gallop+ this.currentBridal.gallop_ + this.currentSaddle.gallop_ + this.currentSaddleBlanket.gallop_;
}
calculateTrotSkill(){
	return this.horse.trot+ this.allEquipment[this.saddleIndex].trot_;
	//return this.horse.trot+ this.currentBridal.trot_ + this.currentSaddle.trot_ + this.currentSaddleBlanket.trot_;
}
/* Caculate total stats based on selected equipment,  currently only applies to specific saddle for testing */
calculateTotalSkills(){
	//console.log(this.allEquipment[this.saddleIndex].name);
	return this.addCommas(this.horse.jumping+ this.allEquipment[this.saddleIndex].jumping_ + this.horse.stamina+ this.allEquipment[this.saddleIndex].stamina_ + 
	 this.horse.speed+ this.allEquipment[this.saddleIndex].speed_ + this.horse.dressage+ this.allEquipment[this.saddleIndex].dressage_ +	 
	 this.horse.gallop+ this.allEquipment[this.saddleIndex].gallop_ +  this.horse.trot+ this.allEquipment[this.saddleIndex].trot_);
	
	return '1,000';
}
/* Adds commas for use on displaying numbers with thousands separator */
addCommas(str) {
    var parts = (str + "").split("."),
        main = parts[0],
        len = main.length,
        output = "",
        first = main.charAt(0),
        i;

    if (first === '-') {
        main = main.slice(1);
        len = main.length;    
    } else {
        first = "";
    }
    i = len - 1;
    while(i >= 0) {
        output = main.charAt(i) + output;
        if ((len - i) % 3 === 0 && i > 0) {
            output = "," + output;
        }
        --i;
    }
    // put sign back
    output = first + output;
    // put decimal part back
    if (parts.length > 1) {
        output += "." + parts[1];
    }
    return output;
}

GetEquipmentList(){
	this.saddlesService.getSaddlesList()
	.subscribe(data => {
	  this.allEquipment = data.map(res => {
		//console.log('saddles', res)
		return{
		  saddleId: res.payload.doc.id,
		  name: res.payload.doc.data()['name'],
		  color: res.payload.doc.data()['color'],
		  equipment: res.payload.doc.data()['equipment'],
		  img_file: res.payload.doc.data()['img_file'],
		  id: res.payload.doc.data()['id'],
		  group: res.payload.doc.data()['group'],
		  dressage_: res.payload.doc.data()['dressage_'],
		  gallop_: res.payload.doc.data()['gallop_'],
		  jumping_: res.payload.doc.data()['jumping_'],
		  speed_: res.payload.doc.data()['speed_'],
		  stamina_: res.payload.doc.data()['stamina_'],
		  trot_: res.payload.doc.data()['trot_'],
		}
	  })
	})
}
} // end horse-page component class