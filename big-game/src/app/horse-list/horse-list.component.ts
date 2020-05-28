import { Component, OnInit } from '@angular/core';
import { UserData } from '../user-data';
import { UserDataService } from '../services/user-data.service';
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
    breed: string;
    color: string;
    name: string;
    allBreeds: Breed[];
    breedSelected: string;
    allColors: Color[];
    colorSelected: string;
    Uid: string = this.authService.getUid();
    user: any

    constructor(private breedService: BreedService, private colorService: ColorService, private authService: AuthService,
        private userDataService: UserDataService,
        private horseDataService: HorseDataService) {
    }

    ngOnInit(): void {
        this.getBreeds();
        this.getColors();
        this.userDataService.getUserByID(this.Uid).subscribe((result) => {
          this.user = result as UserData;
          console.log(this.user);
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

    createRandomHorse(){
      console.log(this.name, this.breed, this.color, this.skill);
    } 
  
    
}
