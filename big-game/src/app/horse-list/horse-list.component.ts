import { Component, OnInit } from '@angular/core';
import { UserData } from '../user-data';
import { UserDataService } from '../services/user-data.service';
import { HorseData } from '../horse-data';
import { HorseDataService } from '../services/horse-data.service';
import { BreedService } from '../services/breed.service';
import { Breed } from '../breed';
import { ColorService } from '../services/color.service';
import { Color } from '../color';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.css']
})

export class HorseListComponent implements OnInit {
  allBreeds: Breed[];
  allColors: Color[];
  breedIdSelected: string;
  skillSelected: string;
  colorIdSelected: string;
  breed: string;
  skill: string;
  name: string;
  color: string;
  Uid: string = this.authService.getUId();
  user: any;
  newHorseCost: number = 1000;
  newEquus: number;
  allHorseData: Array<HorseData>;
  allHorses: Breed[];
  horse: HorseData;
  horseValues: { name, breed, color };

  skills = ['Stamina', 'Gallop', 'Speed', 'Jumping'];
  success = 'A new horse has been added';

 

  constructor(private breedService: BreedService,
    private colorService: ColorService,
    private authService: AuthService,
    private userDataService: UserDataService,
    private horseDataService: HorseDataService) {
  }

  ngOnInit(): void {
    this.getBreeds();
    this.getColors();
    this.getHorseData();
    this.userDataService.getUserByID(this.Uid).subscribe((result) => {
      this.user = result as UserData;
    });
  }

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

  getHorseData(){
    this.horseDataService.getHorsesByUid().subscribe(
      res => {
        this.allHorseData = res as Array<HorseData>;
        this.allHorseData.map(horse =>{
          this.breedService.getBreedById(horse.breed).then( res =>
            horse.breed = res.data()['breed']
            )
          }
        )
        this.allHorseData.map(horse =>{
          this.colorService.getColorById(horse.color).then( res =>
            horse.color = res.data()['color']
            )
          }
        )
      }
    )
  }

  buyNewHorse(newHorseCost: number, newEquus: number) {

  }

  createRandomHorse(name: string, breed: string, color: string, skill: string) {
    this.horseDataService.createRandomHorse(this.horseValues, this.Uid, breed, color, skill, name)
    return alert(this.success);
  }

  horseSelecteId: string;
  selectedHorse(event: any) {
    this.horseSelecteId = (<HTMLInputElement>event.target).id;
  }

  onSelectHorse() {
    this.authService.sethorseId(this.horseSelecteId)
  }
}
