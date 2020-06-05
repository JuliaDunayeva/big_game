import { Component, OnInit } from '@angular/core';
import { UserData } from '../user-data';
import { UserDataService } from '../services/user-data.service';
import { HorseData } from '../horse-data';
import { HorseDataService} from '../services/horse-data.service';
import { BreedService } from '../services/breed.service';
import { Breed } from '../breed';
import { ColorService } from '../services/color.service';
import { Color } from '../color';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.css']
})

export class HorseListComponent implements OnInit {

    skills = ['Stamina','Gallop', 'Speed', 'Jumping'];
    skill: string;
    allBreeds: Breed[];
    breedSelected: string;
    breed: string;
    allColors: Color[];
    colorSelected: string;
    color: string;
    name: string;
    Uid: string = this.authService.getUId();
    user: any;
    horseValues: {name, breed, color};
    allHorseData: Array<HorseData>;
    public horse: HorseData;
    success = 'A new horse has been added';
    newHorseCost: number = 1000;
    newEquus: number;
    selectHorse: FormGroup
    horseSelecteId: string;
    defaultHorse: any;

    constructor(private breedService: BreedService, 
        private colorService: ColorService, 
        private authService: AuthService,
        private userDataService: UserDataService,
        private horseDataService: HorseDataService,
        private fb: FormBuilder) {
    }

    ngOnInit(): void {
    this.getHorseData();
      this.getBreeds();
      this.getColors();
      this.userDataService.getUserByID(this.Uid).subscribe((result) => {
         this.user = result as UserData;
      });
    return this.user;
    }

    getHorseData(): HorseData[] {
      let test =  this.horseDataService.getHorsesByUid().subscribe(
        res => {
          this.allHorseData = res;
          this.defaultHorse = this.allHorseData[0].name
          console.log("default horse " , this.defaultHorse)
          this.createForm();
        });
      return this.allHorseData;
    }

    getBreeds(): Breed[] {
      this.breedService.getBreeds().subscribe((result) => {
        this.allBreeds = result as Array<Breed>;
      });
      return this.allBreeds;
    }

    getColors(): Color[] {
      this.colorService.getColors().subscribe((result) => {
        this.allColors = result as Array<Color>;
      });
      return this.allColors;
    }

    createForm() {
      console.log(this.defaultHorse)
      this.selectHorse = this.fb.group({
        myHorse: [this.defaultHorse, Validators.required]
      })
    }

    selectedHorse(event: any) {
      this.horseSelecteId = (<HTMLInputElement>event.target).id;
    }

    onSelectHorse() {
      this.authService.sethorseId(this.horseSelecteId)
    }

    createRandomHorse(name:string, breed: string, color:string, skill:string){
      this.horseValues={name:name, breed:breed, color:color}
      this.horseDataService.createRandomHorse(this.horseValues, skill, this.Uid)
      return alert(this.success);
    } 

    

    buyNewHorse(newHorseCost: number, newEquus: number) {
      
    }

    onSellHorse(event: any) {
    }

    
}
