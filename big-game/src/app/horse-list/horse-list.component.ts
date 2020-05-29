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
    allHorseData: Array<any>;
    public horse: HorseData;
    success = 'A new horse has been added';

    constructor(private breedService: BreedService, 
        private colorService: ColorService, 
        private authService: AuthService,
        private userDataService: UserDataService,
        private horseDataService: HorseDataService) {
    }

    ngOnInit(): void {
  /*//      this.getBreeds();
        //this.getColors();
        //this.getHorseData();
        this.horseDataService.getHorsesByUid().subscribe(res => {
             //console.log(res[0].payload.doc.id);
             this.authService.sethorseId(res[0].payload.doc.id);
            });
        this.userDataService.getUserByID(this.Uid).subscribe((result) => {
          this.user = result as UserData;
           //console.log(this.user);
      });
      return this.user;*/

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
        // console.log(result);
        this.allBreeds = result as Array<Breed>;
      });
      console.log(this.allBreeds);
      return this.allBreeds;
    }

    getColors(): Color[] {
      this.colorService.getColors().subscribe((result) => {
        // console.log(result);
        this.allColors = result as Array<Color>;
      });
      console.log(this.allColors);
      return this.allColors;
    }

    createRandomHorse(name:string, breed: string, color:string, skill:string){
      this.horseValues={name:name, breed:breed, color:color}
      this.horseDataService.createRandomHorse(this.horseValues, skill, this.Uid)
      return alert(this.success);
    } 

    getHorseData(): HorseData[] {
      let test =  this.horseDataService.getHorseData().subscribe(
        res => this.allHorseData = res);
      return this.allHorseData;
    }
}
