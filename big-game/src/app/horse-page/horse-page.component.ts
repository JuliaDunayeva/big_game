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
import { HorseDataService } from '../services/horse-data.service';
import { HorsePageButtons } from '../horse-page-buttons';
import { AuthService } from '../services/auth.service';
import { Breed } from '../breed';
import { Color } from '../color';
import { sharedStylesheetJitUrl } from '@angular/compiler';
import { parse } from 'querystring';

@Component({
  selector: 'app-horse-page',
  templateUrl: './horse-page.component.html',
  styleUrls: ['./horse-page.component.css'],
})
export class HorsePageComponent implements OnInit {
  /* Care Tab Buttons */
  FeedButtons: HorsePageButtons = new HorsePageButtons();
  DrinkButtons: HorsePageButtons = new HorsePageButtons();
  StrokeButtons: HorsePageButtons = new HorsePageButtons();
  GroomButtons: HorsePageButtons = new HorsePageButtons();
  CarrotButtons: HorsePageButtons = new HorsePageButtons();
  MashButtons: HorsePageButtons = new HorsePageButtons();
/* Empty Button*/
  EmptyButtons:HorsePageButtons = new HorsePageButtons();
/* Ride Tab Buttons*/
  ForestButtons:HorsePageButtons =new HorsePageButtons();
  MountainButtons:HorsePageButtons=new HorsePageButtons();
  /* Competition Buttons */
  BarrelCompButtons:HorsePageButtons=new HorsePageButtons();
  CuttingCompButtons:HorsePageButtons=new HorsePageButtons();
  TrailClassCompButtons:HorsePageButtons=new HorsePageButtons();
  ReignCompButtons:HorsePageButtons=new HorsePageButtons();
  WesternPleasureCompButtons:HorsePageButtons=new HorsePageButtons();
  TrottingCompButtons:HorsePageButtons=new HorsePageButtons();
  /* Breeding Tab Buttons*/
  BreedingInfoButtons:HorsePageButtons=new HorsePageButtons();
  CoverMareButtons:HorsePageButtons=new HorsePageButtons();

  public history:string[]=[];
  //allSkills: string[];
  skill: string;
  allBreeds: Breed[];
  allColors: Color[];

  breedIndex: number = -1;
  colorIndex: number = -1;
 	public horse: HorseData = new HorseData;
	img_file: string;
	img_path: string;
 	public id: string;

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
  public preventchange_1: true;
  public readonly = true;
  public value = 0;

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

  public emptyButton: string;

  public BarrelCompButton:string;
  public CuttingCompButton:string;
  public TrailClassCompButton:string;
  public ReignCompButton:string;
  public WesternPleasureCompButton:string;

  public BreedingInfoButton:string;
  public CoverMareButton:string;

  swap: boolean = false;

  //Buttons for night tab
  public putToBedButton: string;
  public ageButton: string;

  public horseIDs: string[];

  public percent: number = 100;
  public hours: number = 24;

  public seconds: number;
  public taskSeconds: number;

  public hour: number;
  public minute: number;

  updatedTime: {currentHourString: string, currentMinuteString: string};

  public percentStr: string;

  //public totalseconds: number;
  public user: UserData;

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
    this.FeedButtons.energy=15;
    this.FeedButtons.hour=0;
    this.FeedButtons.minute=-30;

    this.DrinkButtons.enabledImage =      'assets/images/horse-page-icons/drink-button-enabled.png';
    this.DrinkButtons.disabledImage =      'assets/images/horse-page-icons/drink-button-disabled.png';
    this.DrinkButtons.energy=5;

    this.StrokeButtons.enabledImage =      'assets/images/horse-page-icons/stroke-button-enabled.png';
    this.StrokeButtons.disabledImage =      'assets/images/horse-page-icons/stroke-button-disabled.png';

    this.GroomButtons.enabledImage =      'assets/images/horse-page-icons/groom-button-enabled.png';
    this.GroomButtons.disabledImage =      'assets/images/horse-page-icons/groom-button-disabled.png';
    this.GroomButtons.energy=-15;

    this.CarrotButtons.enabledImage =      'assets/images/horse-page-icons/carrot-button-enabled.png';
    this.CarrotButtons.disabledImage =      'assets/images/horse-page-icons/carrot-button-disabled.png';

    this.MashButtons.enabledImage =      'assets/images/horse-page-icons/mash-button-enabled.png';
    this.MashButtons.disabledImage =      'assets/images/horse-page-icons/mash-button-disabled.png';

/* Define images for Ride Tab buttons*/
    this.ForestButtons.enabledImage =      'assets/images/horse-page-icons/forest-button-enabled.png';
      this.ForestButtons.disabledImage =      'assets/images/horse-page-icons/forest-button-enabled.png';
      this.ForestButtons.energy=-5;
      this.ForestButtons.morale=10;
      this.ForestButtons.hour=1;
    this.ForestButtons.minute=0;

    this.MountainButtons.enabledImage =      'assets/images/horse-page-icons/mountain-button-enabled.png';
      this.MountainButtons.disabledImage =      'assets/images/horse-page-icons/mountain-button-enabled.png';
      this.MountainButtons.energy=-10;
      this.MountainButtons.morale=15;
      this.MountainButtons.hour=2;
    this.MountainButtons.minute=0;

    this.BreedingInfoButtons.enabledImage = 'assets/images/horse-page-icons/breeding-information-button-enabled.png';
    this.BreedingInfoButtons.disabledImage = 'assets/images/horse-page-icons/breeding-information-button-enabled.png';
    
    this.CoverMareButtons.enabledImage = 'assets/images/horse-page-icons/breeding-cover-mare-button-disabled.png';
    this.CoverMareButtons.disabledImage = 'assets/images/horse-page-icons/breeding-cover-mare-button-disabled.png';
    /* Define image for empty placeholder button*/
    this.EmptyButtons.enabledImage = 'assets/images/horse-page-icons/empty-button.png';
    this.EmptyButtons.disabledImage = 'assets/images/horse-page-icons/empty-button.png';
    /* Care Tab buttons */
    this.toggleButtons(this.FeedButtons, 'feed',true);
    this.toggleButtons(this.DrinkButtons, 'drink',true);
    this.toggleButtons(this.StrokeButtons, 'stroke',true);
    this.toggleButtons(this.GroomButtons, 'groom',true);
    this.toggleButtons(this.CarrotButtons, 'carrot',true);
    this.toggleButtons(this.MashButtons, 'mash',true);
    this.toggleButtons(this.EmptyButtons, 'empty',false);
    /* Ride tab buttons */
    this.toggleButtons(this.ForestButtons, 'forest',true);
    this.toggleButtons(this.MountainButtons, 'mountain',true);
    /* Breeding tab buttons */
    this.toggleButtons(this.BreedingInfoButtons, 'breedinginfo',true);
    this.toggleButtons(this.CoverMareButtons, 'covermare',true);
/* Competition tab buttons */
    this.toggleButtons(this.BarrelCompButtons, 'barrel',false);
    this.toggleButtons(this.CuttingCompButtons, 'cutting',false);
    this.toggleButtons(this.WesternPleasureCompButtons, 'western',false);
    this.toggleButtons(this.ReignCompButtons, 'reign',false);
    this.toggleButtons(this.TrailClassCompButtons, 'trail',false);

    this.imageFile = 'assets/images/horse-page-icons/test-horse-image.png';
    
    this.hour = 24;
    this.minute = 0;
  } // end of ngOnInit() function

  // GetHorse function, used to get currently selected horse's data
  getHorse() {
    setTimeout(() => {
      this.horseDataService.getHorseById(this.id).subscribe((res) => {
        this.horse = res as HorseData;
        this.breedService.getBreedById(this.horse.breed).then( brd =>
            {this.horse.breed = brd.data()['breed'];
            this.img_path = brd.data()['img_path']
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
    }, 0);
  }

  ms2Time(ms: number): string {
    let secs = ms / 1000;
    ms = Math.floor(ms % 1000);
    let minutes = secs / 60;
    secs = Math.floor(secs % 60) * 100;
    let hours = minutes / 60;
    minutes = Math.floor(minutes % 60);
    hours = Math.floor(hours % 24);
    return hours + ':' + minutes + ':' + secs + '.' + ms;
  }

  RefreshEnergy(ms: number) {
    let secs = ms / 1000;
    ms = Math.floor(ms % 1000);
    let minutes = secs / 60;
    secs = Math.floor(secs % 60);
    let hours = minutes / 60;
    minutes = Math.floor(minutes % 60);

    hours = Math.floor(hours % 24);
    if (secs > 10) this.horse.energy += 5;
    return hours + ':' + minutes + ':' + secs + '.' + ms;
  }

// Drink Button fucntion
  public DrinkButton() {
    this.history.unshift(this.horse.name+" is taking a drink");
    //this.toggleButtons(this.DrinkButtons, 'drink',true);
    this.horse.energy=this.horse.energy+this.DrinkButtons.energy;
    if (this.horse.energy>100) this.horse.energy=100;
    // convert time to seconds then back again to display in circlur progress  bar
    // this.seconds = this.hour * 3600 + this.minute * 60;
    // this.taskSeconds = 0 * 3600 + 30 * 60;

    if (this.horse.energy == 0) {
      alert('no energy left');
      return;
    }

    this.horseDataService.setHorseEnergy(
      this.authService.getHorseId(),
      this.horse.energy
    );
  }// end of Drink Button function

  // Stroke Button function
  public StrokeButton() {
    this.history.unshift("Stroking "+this.horse.name);
    //this.toggleButtons(this.StrokeButtons, 'stroke',true);
  } // end of Stroke Button function

  // Groom Button function
  public GroomButton() {
    if (this.horse.energy == 0) {
      alert('no energy left');
      this.toggleButtons(this.GroomButtons,'groom',false);
      return;
    }
    this.history.unshift("Grooming "+this.horse.name);
    if (this.horse.energy > 0) this.horse.energy =this.horse.energy+this.GroomButtons.energy;
    if (this.horse.energy>100) this.horse.energy=100;

    this.horseDataService.setHorseEnergy(
      this.authService.getHorseId(),
      this.horse.energy
    );
    //this.toggleButtons(this.GroomButtons, 'groom',true);
  } // end of Groom Button function

  // Carrot Button function
  public CarrotButton() {
    this.history.unshift(this.horse.name+" ate a carrot");
    //this.toggleButtons(this.CarrotButtons, 'carrot',true);
  }// end of Carrot Button function

  // Mash button function
  public MashButton() {
    this.toggleButtons(this.MashButtons, 'mash',true);
  }// end of Mash Button function

  // Feed Button function
  public FeedButton() {
    let totalseconds=0;
    this.horseDataService.updateHorseTime(this.horse.time, 8, 30)
    if (!this.FeedButtons.enabled){
      alert('No energy to feed.');
      return;
    }
    this.history.unshift("Feeding "+this.horse.name);
    //this.toggleButtons(this.FeedButtons, 'feed',true);
    // convert time to seconds then back again to display in circlur progress  bar
    let hr;
    let min
    /*if (this.horse.time!=null) {
    hr=parseFloat(this.horse.time.currentHourString);
    min=parseFloat(this.horse.time.currentMinuteString);
    }*/
    this.seconds = (this.hour* 3600) + (this.minute * 60);
    this.taskSeconds = this.FeedButtons.hour * 3600 + this.FeedButtons.minute * 60;
    /*if (this.horse.time!=null) {
    this.horse.time.currentHourString=hr.toString();
    this.horse.time.currentMinuteString=min.toString();
    }*/
    //if (this.horse.energy < 95) 
    this.horse.energy= this.horse.energy+this.FeedButtons.energy;
    if (this.horse.energy>100) this.horse.energy=100;
    // subtract seconds for 24hour period from how many seconds for task
    // used to calculate percentage
    //this.horse.time.currentHourString=
    totalseconds = (this.seconds - this.taskSeconds);
 //   console.log(this.seconds);
  //  console.log(this.taskSeconds);
  //  console.log(this.seconds - this.taskSeconds);
  /*   this.hour = this.totalseconds / 3600;

    this.minute = this.hour % 1; // * 60;
    this.minute = parseFloat(this.minute.toFixed(2));
    this.percent = parseFloat(this.percent.toFixed(0));*/
   // this.seconds = parseFloat(this.seconds.toFixed(0));
  /* this.hour = this.hour - this.minute;
    this.hour = parseFloat(this.hour.toFixed(0));
*/
    this.percent = (this.seconds - this.taskSeconds) / 1000;
/*
    let totalStr = this.totalseconds.toString();
    this.totalseconds = parseFloat(totalStr);
    this.totalseconds.toFixed(1);
    if (this.percent < 0) this.percent = 0;
    if (this.hour < 0) this.hour = 0;
    if (this.minute < 0) this.minute = 0;

    this.percentStr = this.ms2Time(this.totalseconds);
*/
    // write data back to database
    this.horseDataService.setHorseEnergy(
      this.authService.getHorseId(),
      this.horse.energy
    );
  } //end of Feed Button function

  public ForestButton(){
    if (this.horse.energy == 0) {
    alert('no energy left');
    this.toggleButtons(this.ForestButtons,'forest',false);
    return;
  }
  this.history.unshift(this.horse.name + " is taking a ride in the forest");
  if (this.horse.energy > 0) this.horse.energy =this.horse.energy+this.ForestButtons.energy;
  if (this.horse.morale > 0) this.horse.morale =this.horse.morale+this.ForestButtons.morale;
  if (this.horse.energy>100) this.horse.energy=100;
  if (this.horse.morale>100) this.horse.morale=100;

  this.horseDataService.setHorseEnergy(
    this.authService.getHorseId(),
    this.horse.energy
  );

  this.horseDataService.setHorseMorale(
    this.authService.getHorseId(),
    this.horse.morale
  );
  //this.toggleButtons(this.ForestButtons, 'forest',true);   
  }

  public MountainButton(){
    if (this.horse.energy == 0) {
    alert('no energy left');
    this.toggleButtons(this.MountainButtons,'moutain',false);
    return;
  }
  this.history.unshift(this.horse.name + " is taking a ride in the mountains");
  if (this.horse.energy > 0) this.horse.energy =this.horse.energy+this.MountainButtons.energy;
  if (this.horse.morale > 0) this.horse.morale =this.horse.morale+this.MountainButtons.morale;
  if (this.horse.energy>100) this.horse.energy=100;
  if (this.horse.morale>100) this.horse.morale=100;

  this.horseDataService.setHorseEnergy(
    this.authService.getHorseId(),
    this.horse.energy
  );

  this.horseDataService.setHorseMorale(
    this.authService.getHorseId(),
    this.horse.morale
  );
  
  this.horseDataService.setHorseTime(
    this.authService.getHorseId(),
    "05","30"
  );
  //this.toggleButtons(this.ForestButtons, 'forest',true);   
  }
  /* Toggle buttons function
      Parameters: 
      button -> HorsePageButtons Class
      buttonChange -> string name of which button to change
      toggle -> boolean, true or false to enable or disable button
  */
  public toggleButtons(button: HorsePageButtons, buttonChange: string, toggle:boolean) {
      //button.enabled = !button.enabled;
    button.enabled=toggle;
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
    getBreeds() {
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
  }
} // end horse-page component class
