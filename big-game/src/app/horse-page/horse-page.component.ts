import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
	ForestButtons: HorsePageButtons = new HorsePageButtons('forest');
	MountainButtons: HorsePageButtons = new HorsePageButtons('mountain');
	/* Competition Buttons */
	BarrelCompButtons: HorsePageButtons = new HorsePageButtons('barrel');
	CuttingCompButtons: HorsePageButtons = new HorsePageButtons('cutting');
	TrailClassCompButtons: HorsePageButtons = new HorsePageButtons('trail');
	ReignCompButtons: HorsePageButtons = new HorsePageButtons('reign');
	WesternPleasureCompButtons: HorsePageButtons = new HorsePageButtons('western');
	TrottingCompButtons: HorsePageButtons = new HorsePageButtons('trotting');
	/* Breeding Tab Buttons*/
	BreedingInfoButtons: HorsePageButtons = new HorsePageButtons('breedinginfo');
	CoverMareButtons: HorsePageButtons = new HorsePageButtons('covermare');

	PutToBedButtons: HorsePageButtons = new HorsePageButtons('bed');
	AgeButtons: HorsePageButtons = new HorsePageButtons('age');
	/* Declare temporary history Array */
	public history: string[] = [];
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
	public percent: number;

	public eq_reg_button: string = 'assets/images/horse-page-icons/eq-reg-button-enabled.png';
	// Arrays for tack items and training
	public items: TackItems[] = [];
	public training: Training[] = [];
	//  used for horse time
	updatedTime: { currentHourString: string, currentMinuteString: string };
	// used for user data
	public user: UserData;

	public timerId;
	// used temporary to set tack items and training;
	private item: TackItems;
	private train: Training;

	public index: number;
	// used to load in equipment data for currently selected horse
	allEquipment: Equipment[];
	currentSaddle: Equipment;
	currentBridal: Equipment;
	currentSaddleBlanket: Equipment;
	public saddleIndex = 1;

	public imgpath = "assets/images/tack-page/";

	buildpath(file: string): string {
		return this.imgpath + file;
	}
	constructor(
		private router: Router,
		private colorService: ColorService,
		private breedService: BreedService,
		private userDataService: UserDataService,
		private horseDataService: HorseDataService,
		private authService: AuthService,
		public saddlesService: SaddlesService,
	) { }

	ngOnInit(): void {
		this.GetEquipmentList();
		//this.currentBridal=this.allEquipment[1];
		//this.currentSaddle=this.allEquipment[1];
		//this.currentSaddleBlanket=this.allEquipment[1];
		//this.mod.showlist();
		//setTimeout(function(){}, 750); 
		// Item list array
		this.item = new TackItems("Golden Apple", "assets/images/tack-page/gold-apple.png");
		this.items.push(this.item);
		this.item = new TackItems("Golden Peramid", "assets/images/tack-page/gold-peramid.png");
		this.items.push(this.item);
		// setup training items list
		this.train = new Training("Stamina", "assets/images/horse-page-icons/training-complete.png", "assets/images/horse-page-icons/training-incomplete.png");
		this.train.setPercent(0);
		this.training.push(this.train);
		this.train = new Training("Speed", "assets/images/horse-page-icons/training-complete.png", "assets/images/horse-page-icons/training-incomplete.png");
		this.train.setPercent(0);
		this.training.push(this.train);
		this.train = new Training("Dressage", "assets/images/horse-page-icons/training-complete.png", "assets/images/horse-page-icons/training-incomplete.png");
		this.train.setPercent(0);
		this.training.push(this.train);
		this.train = new Training("Gallop", "assets/images/horse-page-icons/training-complete.png", "assets/images/horse-page-icons/training-incomplete.png");
		this.train.setPercent(0);
		this.training.push(this.train);
		this.train = new Training("Trot", "assets/images/horse-page-icons/training-complete.png", "assets/images/horse-page-icons/training-incomplete.png");
		this.train.setPercent(0);
		this.training.push(this.train);
		this.train = new Training("Jumping", "assets/images/horse-page-icons/training-complete.png", "assets/images/horse-page-icons/training-incomplete.png");
		this.train.setPercent(0);
		this.training.push(this.train);
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
		this.BarrelCompButtons.enabledImage = 'assets/images/horse-page-icons/competition-barrel-racing-button-enabled.png';
		this.BarrelCompButtons.disabledImage = 'assets/images/horse-page-icons/competition-barrel-racing-button-enabled.png';
		this.BarrelCompButtons.setDefaultTime(4, 0);
		this.BarrelCompButtons.setStatModifiers(5, 5, 5, 5, 5, 5);

		this.CuttingCompButtons.enabledImage = 'assets/images/horse-page-icons/competition-cutting-button-enabled.png';
		this.CuttingCompButtons.disabledImage = 'assets/images/horse-page-icons/competition-cutting-button-enabled.png';
		this.CuttingCompButtons.setDefaultTime(4, 0);
		this.CuttingCompButtons.setStatModifiers(20, 20, 20, 20, 20, 20);

		this.TrailClassCompButtons.enabledImage = 'assets/images/horse-page-icons/competition-trail-class-button-enabled.png';
		this.TrailClassCompButtons.disabledImage = 'assets/images/horse-page-icons/competition-trail-class-button-enabled.png';
		this.TrailClassCompButtons.setDefaultTime(4, 0);
		this.TrailClassCompButtons.setStatModifiers(5, 5, 5, 5, 5, 5);

		this.ReignCompButtons.enabledImage = 'assets/images/horse-page-icons/competition-reining-button-enabled.png';
		this.ReignCompButtons.disabledImage = 'assets/images/horse-page-icons/competition-reining-button-enabled.png';
		this.ReignCompButtons.setStatModifiers(5, 5, 5, 5, 5, 5);

		this.WesternPleasureCompButtons.enabledImage = 'assets/images/horse-page-icons/competition-western-pleasure-button-enabled.png';
		this.WesternPleasureCompButtons.disabledImage = 'assets/images/horse-page-icons/competition-western-pleasure-button-enabled.png';
		this.WesternPleasureCompButtons.setStatModifiers(5, 5, 5, 5, 5, 5);

		this.TrottingCompButtons.enabledImage = 'assets/images/horse-page-icons/competition-trotting-button-enabled.png';
		this.TrottingCompButtons.disabledImage = 'assets/images/horse-page-icons/competition-trotting-button-enabled.png';
		this.TrottingCompButtons.setStatModifiers(5, 5, 5, 5, 5, 5);
		/* Define images for Care Tab buttons */
		this.FeedButtons.enabledImage = 'assets/images/horse-page-icons/feed-button-enabled.png';
		this.FeedButtons.disabledImage = 'assets/images/horse-page-icons/empty-button.png';
		this.FeedButtons.setDefaultTime(0, 30);
		this.FeedButtons.energy = 15;

		this.DrinkButtons.enabledImage = 'assets/images/horse-page-icons/drink-button-enabled.png';
		this.DrinkButtons.disabledImage = 'assets/images/horse-page-icons/drink-button-disabled.png';
		this.DrinkButtons.energy = 5;
		this.DrinkButtons.setDefaultTime(0, 30);

		this.StrokeButtons.enabledImage = 'assets/images/horse-page-icons/stroke-button-enabled.png';
		this.StrokeButtons.disabledImage = 'assets/images/horse-page-icons/stroke-button-disabled.png';
		this.StrokeButtons.setDefaultTime(0, 30);

		this.GroomButtons.enabledImage = 'assets/images/horse-page-icons/groom-button-enabled.png';
		this.GroomButtons.disabledImage = 'assets/images/horse-page-icons/groom-button-disabled.png';
		this.GroomButtons.morale = 5;
		this.GroomButtons.setDefaultTime(0, 30);

		this.CarrotButtons.enabledImage = 'assets/images/horse-page-icons/carrot-button-enabled.png';
		this.CarrotButtons.disabledImage = 'assets/images/horse-page-icons/carrot-button-disabled.png';
		this.CarrotButtons.setDefaultTime(0, 0);

		this.MashButtons.enabledImage = 'assets/images/horse-page-icons/mash-button-enabled.png';
		this.MashButtons.disabledImage = 'assets/images/horse-page-icons/mash-button-disabled.png';
		this.MashButtons.setDefaultTime(0, 0);
		/* Define images for Ride Tab buttons*/
		this.ForestButtons.enabledImage = 'assets/images/horse-page-icons/forest-button-enabled.png';
		this.ForestButtons.disabledImage = 'assets/images/horse-page-icons/forest-button-enabled.png';
		this.ForestButtons.energy = -5;
		this.ForestButtons.morale = 10;
		this.ForestButtons.setDefaultTime(1, 0);

		this.MountainButtons.enabledImage = 'assets/images/horse-page-icons/mountain-button-enabled.png';
		this.MountainButtons.disabledImage = 'assets/images/horse-page-icons/mountain-button-enabled.png';
		this.MountainButtons.energy = -10;
		this.MountainButtons.morale = 15;
		this.MountainButtons.setDefaultTime(2, 0);

		this.BreedingInfoButtons.enabledImage = 'assets/images/horse-page-icons/breeding-information-button-enabled.png';
		this.BreedingInfoButtons.disabledImage = 'assets/images/horse-page-icons/breeding-information-button-enabled.png';
		this.BreedingInfoButtons.name = 'breedinginfo';
		this.BreedingInfoButtons.setDefaultTime(0, 0);

		this.CoverMareButtons.enabledImage = 'assets/images/horse-page-icons/breeding-cover-mare-button-disabled.png';
		this.CoverMareButtons.disabledImage = 'assets/images/horse-page-icons/empty-button.png';
		//breeding-cover-mare-button-disabled.
		this.CoverMareButtons.name = 'covermare';
		this.CoverMareButtons.setDefaultTime(0, 0);
		/* Define image for empty placeholder button*/
		this.EmptyButtons.enabledImage = 'assets/images/horse-page-icons/empty-button.png';
		this.EmptyButtons.disabledImage = 'assets/images/horse-page-icons/empty-button.png';
		this.EmptyButtons.setDefaultTime(0, 0);

		this.PutToBedButtons.enabledImage = 'assets/images/horse-page-icons/put-to-bed-disabled.png';
		this.PutToBedButtons.disabledImage = 'assets/images/horse-page-icons/put-to-bed-enabled.png';
		this.PutToBedButtons.setDefaultTime(0, 0);

		this.AgeButtons.enabledImage = 'assets/images/horse-page-icons/age-button-enabled.png';
		this.AgeButtons.disabledImage = 'assets/images/horse-page-icons/age-button-disabled.png';
		this.AgeButtons.setDefaultTime(24, 0);

		/* Care Tab buttons */
		this.FeedButtons.toggleButton(true);
		this.DrinkButtons.toggleButton(true);
		this.StrokeButtons.toggleButton(true);
		this.GroomButtons.toggleButton(false);
		this.CarrotButtons.toggleButton(false);
		this.MashButtons.toggleButton(false);
		this.EmptyButtons.toggleButton(false);
		/*Night tab Buttons */
		this.PutToBedButtons.toggleButton(false);
		this.AgeButtons.toggleButton(true);
		/* Ride tab buttons */
		this.ForestButtons.toggleButton(false);
		this.MountainButtons.toggleButton(false);
		/* Breeding tab buttons */
		this.BreedingInfoButtons.toggleButton(true);
		//this.toggleButtons(this.CoverMareButtons, true);

		/* Competition tab buttons */
		this.BarrelCompButtons.toggleButton(false);
		this.CuttingCompButtons.toggleButton(false);
		this.WesternPleasureCompButtons.toggleButton(false);
		this.ReignCompButtons.toggleButton(false);
		this.TrailClassCompButtons.toggleButton(false);
		this.checkButtons();
		this.toggleAllButtons();
	} // end of ngOnInit() function
	// GetHorse function, used to get currently selected horse's data
	getHorse() {
		this.horseDataService.getHorseById(this.id).subscribe((res) => {
			this.horse = res as HorseData;
			this.breedService.getBreedById(this.horse.breed).then(brd => {
				this.horse.breed = brd.data()['breed'];
				this.img_path = brd.data()['img_path'];
				//calculating percent for circle progress from database info
				this.percent = Math.floor(
					((Number(this.horse.time.currentHourString) * 3600
						+ Number(this.horse.time.currentMinuteString) * 60)
					) / 240 * (100 / 360))
			}
			)
			this.colorService.getColorById(this.horse.color).then(clr => {
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

		});
		//this.timerId = setInterval(this.alertFunc(this.horse),1000);
		//console.log(this.id);
		//console.log(this.horse.id);
	} // end of GetHorse() function
	/* test callback function for setInterval line in above function */
	alertFunc(myhorse: HorseData) {
		console.log(myhorse);
		myhorse.energy--;
		alert('tick');
		this.updateEnergyBar();
	}
	/* Return number of seconds for specified about of hours and/or minutes */
	public returnSeconds(hr: number, min: number): number {
		return (hr * 3600) + (min * 60);
	}
	// Drink Button fucntion
	public DrinkButton() {
		if (this.horse.energy == 100) {
			alert(this.horse.name + ' is full');
			this.DrinkButtons.toggleButton(false);
			return
		}
		this.history.unshift(" is taking a drink");
		//this.toggleButtons(this.DrinkButtons, 'drink',true);
		this.horse.energy = this.horse.energy + this.DrinkButtons.energy;
		this.CheckStats();
		//if (this.horse.energy > 100) this.horse.energy = 100;
		this.percent = this.horseDataService.updateHorseTime(this.horse.time, this.horse.age, this.DrinkButtons.hour, this.DrinkButtons.minute);
		this.horseDataService.setHorseEnergy(this.horse);
		this.updateEnergyBar();
		this.checkButtons();
	}// end of Drink Button function

	// Stroke Button function
	public StrokeButton() {
		if (!this.StrokeButtons.enabled) {
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
			this.GroomButtons.toggleButton(false);
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
		this.CarrotButtons.toggleButton(!this.CarrotButtons.enabled)
		this.checkButtons();
		//this.toggleButtons(this.CarrotButtons, 'carrot',true);
	}// end of Carrot Button function

	// Mash button function
	public MashButton() {
		this.MashButtons.toggleButton(!this.MashButtons.enabled);
		this.checkButtons();
		this.returnCurrentSaddle();
		this.currentBridal = this.allEquipment[1];
		this.currentSaddle = this.allEquipment[1];
		this.currentSaddleBlanket = this.allEquipment[1];
	}// end of Mash Button function

	public PutToBedButton() {
		if (this.horse.energy > 99) {
			alert(this.horse.name + ' doesnt need anymore rest.');
			this.PutToBedButtons.toggleButton(false);
			return;
		}
		this.history.unshift(' is resting');
		if (this.horse.health < 100) this.horse.health = 100;
		if (this.horse.morale < 100) this.horse.morale = 100;
		if (this.horse.energy < 100) this.horse.energy = 100;
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
		this.AgeButtons.toggleButton(!this.AgeButtons.enabled);
		this.percent = this.horseDataService.updateHorseTime(this.horse.time, this.horse.age, this.AgeButtons.hour, this.AgeButtons.minute);
		this.horseDataService.setHorseTime(this.horse, '24', '00');
		this.checkButtons();
	}// end of Age Button function

	// Feed Button function
	public FeedButton() {
		let totalseconds = 0;
		if (this.horse.energy > 99) {
			alert(this.horse.name + ' is full.');
			this.FeedButtons.toggleButton(false);
			return;
		}
		this.history.unshift(" is eating");
		this.horse.energy = this.horse.energy + this.FeedButtons.energy;
		this.percent = this.horseDataService.updateHorseTime(this.horse.time, this.horse.age, this.FeedButtons.hour, this.FeedButtons.minute);
		/* Check energy and disable/enable appropriate buttons */
		this.CheckStats();
		/* write data back to database */
		this.horseDataService.setHorseEnergy(this.horse);
		this.updateEnergyBar();
		this.checkButtons();
	} //end of Feed Button function
	//Forest Ride Function
	public ForestButton() {
		this.checkButtons();
		if (this.horse.energy < 1) {
			alert('no energy left');
			this.ForestButtons.toggleButton(false);
			return;
		}
		this.percent = this.horseDataService.updateHorseTime(this.horse.time, this.horse.age, this.ForestButtons.hour, this.ForestButtons.minute);
		this.history.unshift(" is taking a ride in the forest");

		if (this.horse.energy > 0) this.horse.energy = this.horse.energy + this.ForestButtons.energy;
		if (this.horse.morale > 0) this.horse.morale = this.horse.morale + this.ForestButtons.morale;
		/* Check energy and disable/enable appropriate buttons */
		this.CheckStats();

		/* write data back to database */
		this.horseDataService.setHorseEnergy(this.horse);
		this.horseDataService.setHorseMorale(this.horse);
		this.updateEnergyBar();
		this.updateMoraleBar();
		//this.toggleButtons(this.ForestButtons, 'forest',true);   
	}
	// Mountain Ride Function
	public MountainButton() {
		this.checkButtons();
		if (this.horse.energy < 1) {
			alert('no energy left');
			this.MountainButtons.toggleButton(false);
			return;
		}
		this.percent = this.horseDataService.updateHorseTime(this.horse.time, this.horse.age, this.MountainButtons.hour, this.MountainButtons.minute);
		this.history.unshift(" is taking a ride in the mountains");
		if (this.horse.energy > 0) this.horse.energy = this.horse.energy + this.MountainButtons.energy;
		if (this.horse.morale > 0) this.horse.morale = this.horse.morale + this.MountainButtons.morale;
		/* Check energy and disable/enable appropriate buttons */
		this.CheckStats();
		/* write data back to database */
		this.horseDataService.setHorseEnergy(this.horse);
		this.horseDataService.setHorseMorale(this.horse);
		this.updateEnergyBar();
		this.updateMoraleBar();
		//this.toggleButtons(this.ForestButtons, 'forest',true);   
	}
	// Barrel Competition Function
	public BarrelComp() {
		if (this.horse.energy == 0) {
			alert('no energy to enter competition');
			return;
		}
		if (this.training[0].isDone()) {
			//alert('Training is done');
			//return;
		}
		this.history.unshift(' is Competing in a Barrel Race Competition');
		if (this.horse.health > 0) this.horse.health -= 1;
		if (this.horse.morale > 0) this.horse.morale -= 5;
		if (this.horse.energy > 0) this.horse.energy -= 5;
		this.percent = this.horseDataService.updateHorseTime(this.horse.time, this.horse.age, this.BarrelCompButtons.hour, this.BarrelCompButtons.minute);
		this.updateTraining();
		this.CheckStats();
		this.horseDataService.setHorseHealth(this.horse);
		this.horseDataService.setHorseMorale(this.horse);
		this.horseDataService.setHorseEnergy(this.horse);
		this.updateHealthBar()
		this.updateEnergyBar()
		this.updateMoraleBar()
	}

	updateTraining() {
		if (this.training[0].getPercent() < 100) this.training[0].setPercent(this.training[0].getPercent() + this.BarrelCompButtons.stamina);
		if (this.training[1].getPercent() < 100) this.training[1].setPercent(this.training[1].getPercent() + this.BarrelCompButtons.speed);
		if (this.training[2].getPercent() < 100) this.training[2].setPercent(this.training[2].getPercent() + this.BarrelCompButtons.dressage);
		if (this.training[3].getPercent() < 100) this.training[3].setPercent(this.training[3].getPercent() + this.BarrelCompButtons.gallop);
		if (this.training[4].getPercent() < 100) this.training[4].setPercent(this.training[4].getPercent() + this.BarrelCompButtons.trot);
		if (this.training[5].getPercent() < 100) this.training[5].setPercent(this.training[5].getPercent() + this.BarrelCompButtons.jumping);
	}
	// Cutting Competition Function
	public CuttingComp() {
		if (this.horse.energy == 0) {
			alert('no energy to enter competition');
			return;
		}
		if (this.training[1].isDone()) {
			//alert('Training is done');
			//return;
		}
		this.history.unshift(' is Competing in a Cutting Competition');
		if (this.horse.health > 0) this.horse.health -= 1;
		if (this.horse.morale > 0) this.horse.morale -= 5;
		if (this.horse.energy > 0) this.horse.energy -= 5;
		this.percent = this.horseDataService.updateHorseTime(this.horse.time, this.horse.age, this.CuttingCompButtons.hour, this.CuttingCompButtons.minute);
		//if (this.training[1].getPercent() < 100) this.training[1].setPercent(this.training[1].getPercent() + 10)
		this.updateTraining();
		this.CheckStats();
		this.horseDataService.setHorseHealth(this.horse);
		this.horseDataService.setHorseMorale(this.horse);
		this.horseDataService.setHorseEnergy(this.horse);
		this.updateHealthBar()
		this.updateEnergyBar()
		this.updateMoraleBar()
	}
	// Trail Class Competition Function
	public TrailComp() {
		this.history.unshift(' is Competing in a Trail Ride Competition');
		this.updateTraining();
	}
	//Reign Competition Function
	public ReignComp() {
		this.history.unshift(' is Competing in a Reign Competition');
		this.updateTraining();
	}
	//Western Pleasure Competition Function
	public WesternPleasureComp() {
		this.history.unshift(' is Competing in a Western Pleasure Competition');
		this.updateTraining();
	}
	//Breeding function
	public coverMareButton() {
		if (this.horse.gender == 'mare') {
			this.router.navigate(['breeding'])
		}
		if (this.horse.gender == 'stallion') {
			alert('need a mare');
		}
	}
	/* Check horse stats and make sure that there are not over 100 or less than 0 */
	public CheckStats() {
		if (this.horse.energy > 100) this.horse.energy = 100;
		if (this.horse.morale > 100) this.horse.morale = 100;
		if (this.horse.health > 100) this.horse.health = 100;
		if (this.horse.energy < 0) this.horse.energy = 0;
		if (this.horse.morale < 0) this.horse.morale = 0;
		if (this.horse.health < 0) this.horse.health = 0;
	}
	/* used to check energy and other stats and disable/enable appropriate buttons */
	public checkButtons() {
		if (this.horse.energy < 50) this.horse.morale - 5;

		if (this.horse.gender == "mare") {
			this.CoverMareButtons.toggleButton(true);
		} else {
			this.CoverMareButtons.toggleButton(false);
		}

		if (this.horse.energy == 100) {
			this.FeedButtons.toggleButton(false);
			this.PutToBedButtons.toggleButton(false);
			this.DrinkButtons.toggleButton(false);
			this.GroomButtons.toggleButton(true);
			this.ForestButtons.toggleButton(true);
			this.ForestButtons.toggleButton(true);
			this.MountainButtons.toggleButton(true);
		}
		if (this.horse.energy > 1 && this.horse.energy < 99) {
			this.FeedButtons.toggleButton(true);
			this.DrinkButtons.toggleButton(true);
			this.GroomButtons.toggleButton(true);
			this.ForestButtons.toggleButton(true);
			this.ForestButtons.toggleButton(true);
			this.MountainButtons.toggleButton(true);
		}
		if (this.horse.energy == 0) {
			this.FeedButtons.toggleButton(true);
			this.DrinkButtons.toggleButton(true);
			this.GroomButtons.toggleButton(false);
			this.ForestButtons.toggleButton(false);
			this.ForestButtons.toggleButton(false);
			this.MountainButtons.toggleButton(false);
			this.PutToBedButtons.toggleButton(true);
		}
		if (this.horse.morale > 1 && this.horse.morale < 99) {
			this.GroomButtons.toggleButton(true);
		}
		if (this.horse.morale > 99) {
			this.GroomButtons.toggleButton(false);
		}
		this.toggleAllButtons();
	}

	toggleAllButtons() {
		this.setButtons(this.FeedButtons);
		this.setButtons(this.DrinkButtons);
		this.setButtons(this.StrokeButtons);
		this.setButtons(this.GroomButtons);
		this.setButtons(this.CarrotButtons);
		this.setButtons(this.MashButtons);
		this.setButtons(this.EmptyButtons);
		/*Night tab Buttons */
		this.setButtons(this.PutToBedButtons);
		this.setButtons(this.AgeButtons);
		/* Ride tab buttons */
		this.setButtons(this.ForestButtons);
		this.setButtons(this.MountainButtons);
		/* Breeding tab buttons */
		this.setButtons(this.BreedingInfoButtons);
		this.setButtons(this.CoverMareButtons);
		/* Competition tab buttons */
		this.setButtons(this.BarrelCompButtons);
		this.setButtons(this.CuttingCompButtons);
		this.setButtons(this.WesternPleasureCompButtons);
		this.setButtons(this.ReignCompButtons);
		this.setButtons(this.TrailClassCompButtons);
	}
	/* set images for buttons function
		Parameters: 
		button -> HorsePageButtons Class
	*/
	public setButtons(button: HorsePageButtons) {
		let buttonChange = button.name;
		let toggle = button.enabled;
		switch (buttonChange) {
			case 'feed':
				this.feedButton = button.toggleButton(toggle);
				break;
			case 'drink':
				this.drinkButton = button.toggleButton(toggle);
				break;
			case 'stroke':
				this.strokeButton = button.toggleButton(toggle);
				break;
			case 'groom':
				this.groomButton = button.toggleButton(toggle);
				break;
			case 'carrot':
				this.carrotButton = button.toggleButton(toggle);
				break;
			case 'mash':
				this.mashButton = button.toggleButton(toggle);
				break;
			case 'forest':
				this.forestButton = button.toggleButton(toggle);
				break;
			case 'mountain':
				this.mountainButton = button.toggleButton(toggle);
				break;
			case 'empty':
				this.emptyButton = button.toggleButton(toggle);
				break;
			case 'breedinginfo':
				this.BreedingInfoButton = button.toggleButton(toggle);
				break;
			case 'covermare':
				this.CoverMareButton = button.toggleButton(toggle);
				break;
			case 'barrel':
				this.BarrelCompButton = button.toggleButton(toggle);
				break;
			case 'cutting':
				this.CuttingCompButton = button.toggleButton(toggle);
				break;
			case 'trail':
				this.TrailClassCompButton = button.toggleButton(toggle);
				break;
			case 'reign':
				this.ReignCompButton = button.toggleButton(toggle);
				break;
			case 'western':
				this.WesternPleasureCompButton = button.toggleButton(toggle);
				break;
			case 'bed':
				this.putToBedButton = button.toggleButton(toggle);
				break;
			case 'age':
				this.ageButton = button.toggleButton(toggle);
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

	updateEnergyBar() {
		let elem = document.getElementById('energyBar');
		elem.style.width = this.horse.energy + "%";
	}
	updateHealthBar() {
		let elem = document.getElementById('healthBar');
		elem.style.width = this.horse.health + "%";
	}
	updateMoraleBar() {
		let elem = document.getElementById('moraleBar');
		elem.style.width = this.horse.morale + "%";
	}
	returnCurrentSaddle() {
		for (let i = 0; i < this.allEquipment.length; i++) {
			//console.log(this.allEquipment[i].name)
		}
	}
	/* Functions used by HTML to calculate each new stat based on equipment, currently only applies to a specific saddle for testing */
	calculateJumpSkill() {
		return this.horse.jumping + this.allEquipment[this.saddleIndex].jumping_;
		//return this.horse.jumping+ this.currentBridal.jumping_ + this.currentSaddle.jumping_ + this.currentSaddleBlanket.jumping_;
	}
	calculateStaminaSkill() {
		return this.horse.stamina + this.allEquipment[this.saddleIndex].stamina_;
		//return this.horse.stamina+ this.currentBridal.stamina_ + this.currentSaddle.stamina_ + this.currentSaddleBlanket.stamina_;
	}
	calculateSpeedSkill() {
		return this.horse.speed + this.allEquipment[this.saddleIndex].speed_;
		//return this.horse.speed+ this.currentBridal.speed_ + this.currentSaddle.speed_ + this.currentSaddleBlanket.speed_;
	}
	calculateDressageSkill() {
		return this.horse.dressage + this.allEquipment[this.saddleIndex].dressage_;
		//return this.horse.dressage+ this.currentBridal.dressage_ + this.currentSaddle.dressage_ + this.currentSaddleBlanket.dressage_;
	}
	calculateGallopSkill() {
		return this.horse.gallop + this.allEquipment[this.saddleIndex].gallop_;
		//return this.horse.gallop+ this.currentBridal.gallop_ + this.currentSaddle.gallop_ + this.currentSaddleBlanket.gallop_;
	}
	calculateTrotSkill() {
		return this.horse.trot + this.allEquipment[this.saddleIndex].trot_;
		//return this.horse.trot+ this.currentBridal.trot_ + this.currentSaddle.trot_ + this.currentSaddleBlanket.trot_;
	}
	/* Caculate total stats based on selected equipment,  currently only applies to specific saddle for testing */
	calculateTotalSkills() {
		return this.addCommas(this.horse.jumping + this.allEquipment[this.saddleIndex].jumping_ + this.horse.stamina + this.allEquipment[this.saddleIndex].stamina_ +
			this.horse.speed + this.allEquipment[this.saddleIndex].speed_ + this.horse.dressage + this.allEquipment[this.saddleIndex].dressage_ +
			this.horse.gallop + this.allEquipment[this.saddleIndex].gallop_ + this.horse.trot + this.allEquipment[this.saddleIndex].trot_);
	}
	returnTotalSkills(): number {
		let result = (this.horse.jumping + this.allEquipment[this.saddleIndex].jumping_ + this.horse.stamina + this.allEquipment[this.saddleIndex].stamina_ +
			this.horse.speed + this.allEquipment[this.saddleIndex].speed_ + this.horse.dressage + this.allEquipment[this.saddleIndex].dressage_ +
			this.horse.gallop + this.allEquipment[this.saddleIndex].gallop_ + this.horse.trot + this.allEquipment[this.saddleIndex].trot_);
		/* Return a value number between 1 and 10 based on values retrieved */
		if (result <= 100) return (result / 10);
		if (result > 100 && result <= 1000) return (result / 100);
		if (result > 1000 && result <= 10000) return (result / 1000);
	}
	returnStaminaSkills(): number {
		let result = (this.horse.stamina + this.allEquipment[this.saddleIndex].stamina_);
		/* Return a value number between 1 and 10 based on values retrieved */
		if (result <= 100) return (result / 10);
		if (result > 100 && result <= 1000) return (result / 100);
		if (result > 1000 && result <= 10000) return (result / 1000);
	}

	returnSpeedSkills(): number {
		let result = (this.horse.speed + this.allEquipment[this.saddleIndex].speed_);
		/* Return a value number between 1 and 10 based on values retrieved */
		if (result <= 100) return (result / 10);
		if (result > 100 && result <= 1000) return (result / 100);
		if (result > 1000 && result <= 10000) return (result / 1000);
	}

	returnDressageSkills(): number {
		let result = (this.horse.dressage + this.allEquipment[this.saddleIndex].dressage_);
		/* Return a value number between 1 and 10 based on values retrieved */
		if (result <= 100) return (result / 10);
		if (result > 100 && result <= 1000) return (result / 100);
		if (result > 1000 && result <= 10000) return (result / 100);
	}

	returnGallopSkills(): number {
		let result = (this.horse.gallop + this.allEquipment[this.saddleIndex].gallop_);
		/* Return a value number between 1 and 10 based on values retrieved */
		if (result <= 100) return (result / 10);
		if (result > 100 && result <= 1000) return (result / 100);
		if (result > 1000 && result <= 10000) return (result / 1000);
	}
	returnTrotSkills(): number {
		let result = (this.horse.trot + this.allEquipment[this.saddleIndex].trot_);
		/* Return a value number between 1 and 10 based on values retrieved */
		if (result <= 100) return (result / 10);
		if (result > 100 && result <= 1000) return (result / 100);
		if (result > 1000 && result <= 10000) return (result / 1000);
	}
	returnJumpSkills(): number {
		let result = (this.horse.jumping + this.allEquipment[this.saddleIndex].jumping_);
		/* Return a value number between 1 and 10 based on values retrieved */
		if (result <= 100) return (result / 10);
		if (result > 100 && result <= 1000) return (result / 100);
		if (result > 1000 && result <= 10000) return (result / 1000);
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
		while (i >= 0) {
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

	GetEquipmentList() {
		this.saddlesService.getSaddlesList()
			.subscribe(data => {
				this.allEquipment = data.map(res => {
					//console.log('saddles', res)
					return {
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
						cost: res.payload.doc.data()['cost'],
					}
				})
			})
	}
} // end horse-page component class