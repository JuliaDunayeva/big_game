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
  allSkills: string[];
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

  // Buttons for care tab
  public feedButton: string;
  public drinkButton: string;
  public strokeButton: string;

  public groomButton: string;
  public carrotButton: string;
  public mashButton: string;

  // Buttons for Ride tab
  public forestButton: string;
  public mountainButton: string;

  public emptyButton: string;

  public BreedingInfoButton:string;
  public CoverMareButton:string;

  swap: boolean = false;

  //Buttons for night tab
  public putToBedButton: string;
  public ageButton: string;

  public ownerName: string;

  public horseIDs: string[];

  public myHorses: HorseData[];

  public percent: number = 100;
  public hours: number = 24;

  public seconds: number;
  public taskSeconds: number;

  public hour: number;
  public minute: number;

  public percentStr: string;

  public totalseconds: number;
  public user: UserData;

  constructor(
    private router: ActivatedRoute,
    private http: HttpClient,
    private colorService: ColorService,
    private breedService: BreedService,
    private userDataService: UserDataService,
    private horseDataService: HorseDataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //setTimeout(() =>
    //{
    this.getBreeds();
    this.getColors();

    this.id = this.authService.getHorseId();
    this.getHorse();
    this.userDataService
      .getUserByID(this.authService.getUId())
      .subscribe((ref) => {
        this.user = ref;
      });
    //console.log('got horse data');
    //}, 0);

    // streamline buttons code, not working on it right now, fixing other more important code

    this.FeedButtons.enabledImage =
      'assets/images/horse-page-icons/feed-button-enabled.png';
    this.FeedButtons.disabledImage =
      'assets/images/horse-page-icons/feed-button-enabled.png';
    this.FeedButtons.enabled = true;

    this.DrinkButtons.enabledImage =
      'assets/images/horse-page-icons/drink-button-enabled.png';
    this.DrinkButtons.disabledImage =
      'assets/images/horse-page-icons/drink-button-disabled.png';
    this.DrinkButtons.enabled = true;

    this.StrokeButtons.enabledImage =
      'assets/images/horse-page-icons/stroke-button-enabled.png';
    this.StrokeButtons.disabledImage =
      'assets/images/horse-page-icons/stroke-button-disabled.png';
    this.StrokeButtons.enabled = true;

    this.GroomButtons.enabledImage =
      'assets/images/horse-page-icons/groom-button-enabled.png';
    this.GroomButtons.disabledImage =
      'assets/images/horse-page-icons/groom-button-disabled.png';
    this.GroomButtons.enabled = true;

    this.CarrotButtons.enabledImage =
      'assets/images/horse-page-icons/carrot-button-enabled.png';
    this.CarrotButtons.disabledImage =
      'assets/images/horse-page-icons/carrot-button-disabled.png';
    this.CarrotButtons.enabled = true;

    this.MashButtons.enabledImage =
      'assets/images/horse-page-icons/mash-button-enabled.png';
    this.MashButtons.disabledImage =
      'assets/images/horse-page-icons/mash-button-disabled.png';
    this.MashButtons.enabled = true;

    this.ForestButtons.enabledImage =
      'assets/images/horse-page-icons/forest-button-enabled.png';
      this.ForestButtons.disabledImage =
      'assets/images/horse-page-icons/forest-button-enabled.png';
    this.MountainButtons.enabledImage =
      'assets/images/horse-page-icons/mountain-button-enabled.png';
      this.MountainButtons.disabledImage =
      'assets/images/horse-page-icons/mountain-button-enabled.png';

    this.EmptyButtons.enabledImage = 'assets/images/horse-page-icons/empty-button.png';
    this.EmptyButtons.disabledImage = 'assets/images/horse-page-icons/empty-button.png';

    this.BreedingInfoButtons.enabledImage = 'assets/images/horse-page-icons/breeding-information-button-enabled.png';
    this.BreedingInfoButtons.disabledImage = 'assets/images/horse-page-icons/breeding-information-button-enabled.png';

    this.changeButtons(this.FeedButtons, 'feed');
    this.changeButtons(this.DrinkButtons, 'drink');
    this.changeButtons(this.StrokeButtons, 'stroke');
    this.changeButtons(this.GroomButtons, 'groom');
    this.changeButtons(this.CarrotButtons, 'carrot');
    this.changeButtons(this.MashButtons, 'mash');
    this.changeButtons(this.EmptyButtons, 'empty');
    this.changeButtons(this.ForestButtons, 'forest');
    this.changeButtons(this.MountainButtons, 'mountain');
    this.changeButtons(this.BreedingInfoButtons, 'breedinginfo');
    this.changeButtons(this.CoverMareButtons, 'covermare');


    

    //this.imageFile= 'assets/images/horses/akhal_teke/alz-b.png';
    this.imageFile = 'assets/images/horse-page-icons/test-horse-image.png';
    //this.imagePath = 'assets/images/horses/';
    // this.imagePath = this.imageFile;

    this.hour = 24;
    this.minute = 0;
  } // end of ngOnInit() function

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
    secs = Math.floor(secs % 60);
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

  public DrinkButton() {
    this.history.push(this.horse.name+" is taking a drink");
    this.changeButtons(this.DrinkButtons, 'drink');
    // convert time to seconds then back again to display in circlur progress  bar
    this.seconds = this.hour * 3600 + this.minute * 60;
    this.taskSeconds = 0 * 3600 + 30 * 60;
    if (this.horse.energy == 0) {
      alert('no energy left');
      return;
    }
  }

  public StrokeButton() {
    this.history.push("Stroking "+this.horse.name);
    this.changeButtons(this.StrokeButtons, 'stroke');
  }

  public GroomButton() {
    this.history.push("Grooming "+this.horse.name);
    if (this.horse.energy > 0) this.horse.energy -= 5;
    this.changeButtons(this.GroomButtons, 'groom');
  }

  public CarrotButton() {
    this.history.push(this.horse.name+" ate a carrot");
    this.changeButtons(this.CarrotButtons, 'carrot');
  }

  public MashButton() {
    this.changeButtons(this.MashButtons, 'mash');
  }

  public FeedButton() {
    
    this.history.push("Feeding "+this.horse.name);
    this.changeButtons(this.FeedButtons, 'feed');
    // convert time to seconds then back again to display in circlur progress  bar
    this.seconds = this.hour * 3600 + this.minute * 60;
    this.taskSeconds = 0 * 3600 + 30 * 60;
    if (this.horse.energy == 0) {
      alert('no energy left');
      return;
    }

    if (this.horse.energy > 0) this.horse.energy += 5;
    // subtract seconds for 24hour period from how many seconds for task
    this.totalseconds = this.seconds - this.taskSeconds;
    this.hour = this.totalseconds / 3600;

    this.minute = this.hour % 1; // * 60;
    this.minute = parseFloat(this.minute.toFixed(2));
    this.percent = parseFloat(this.percent.toFixed(0));
    this.seconds = parseFloat(this.seconds.toFixed(0));
    this.hour = this.hour - this.minute;
    this.hour = parseFloat(this.hour.toFixed(0));

    this.percent = (this.seconds - this.taskSeconds) / 1000;

    let totalStr = this.totalseconds.toString();
    this.totalseconds = parseFloat(totalStr);
    this.totalseconds.toFixed(1);
    if (this.percent < 0) this.percent = 0;
    if (this.hour < 0) this.hour = 0;
    if (this.minute < 0) this.minute = 0;

    this.percentStr = this.ms2Time(this.totalseconds);

    // write data back to database
    this.horseDataService.setHorseEnergy(
      this.authService.getHorseId(),
      this.horse.energy
    );
  } //end feebutton

  public changeButtons(button: HorsePageButtons, buttonChange: string) {
    button.enabled = !button.enabled;
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
    }
  }

  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  } // end of toggle() function

  LoadHorseImage() {
      this.imagePath = 'assets/images/horses/';
      this.imagePath += `${this.img_path}/${this.img_file}`
    } // end of LoadHorseImage() function
    
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
    }
  
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

  /*public beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange_1' && $event.nextState === false) {
      $event.preventDefault();
    }
  } // end of beforeChange() function*/
} // end horse-page component class
