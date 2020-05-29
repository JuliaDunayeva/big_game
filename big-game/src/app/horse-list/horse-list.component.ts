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
    allHorseData: HorseData[];
    public horse: HorseData;

    constructor(private breedService: BreedService, 
        private colorService: ColorService, 
        private authService: AuthService,
        private userDataService: UserDataService,
        private horseDataService: HorseDataService) {
    }

    ngOnInit(): void {
        this.getBreeds();
        this.getColors();
        this.getHorseData();
        this.userDataService.getUserByID(this.Uid).subscribe((result) => {
          this.user = result as UserData;
          // console.log(this.user);
      });
      return this.user;
    }

    getBreeds(): Breed[] {
      this.breedService.getBreeds().subscribe((result) => {
        console.log(result);
        this.allBreeds = result as Array<Breed>;
      });
      return this.allBreeds;
    }

    getColors(): Color[] {
      this.colorService.getColors().subscribe((result) => {
        console.log(result);
        this.allColors = result as Array<Color>;
      });
      return this.allColors;
    }

    createRandomHorse(name:string, breed: string, color:string, skill:string){
      this.horseValues={name:name, breed:breed, color:color}
      console.log(name, breed, color, skill);
      this.horseDataService.createRandomHorse(this.horseValues, skill, this.Uid)
    } 

    getHorseData(): HorseData[] {
      this.horseDataService.getHorseData().subscribe(
              (result) =>{
                console.log('result ' + result);
                this.allHorseData = result as Array<HorseData>;
                console.log('this.allhorsedatat ' + this.allHorseData)
              }
          );
    return this.allHorseData;
    }
}
