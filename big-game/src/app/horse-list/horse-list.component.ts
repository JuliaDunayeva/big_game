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
  breedSelected: Breed;
  breedIdSelected: string;
  skillSelected: string;
  colorSelected: Color;
  colorIdSelected: string;
  breed: string;
  skill: string;
  name: string;
  color: string;
  Uid: string = this.authService.getUId();
  user: any;
  newHorseCost: number = 1000;
  newEquus: number;
  allHorseData: Array<any>;
  public horse: HorseData;
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
      this.breedSelected = this.allBreeds[0];
      this.breedIdSelected = this.allBreeds[0].id
      this.skillSelected = this.breedSelected.skill
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
      this.colorSelected = this.allColors[0];
      this.colorIdSelected = this.allColors[0].id
    });
  }


  buyNewHorse(newHorseCost: number, newEquus: number) {

  }

  createRandomHorse(name: string, breed: string, color: string, skill: string) {
    this.horseValues = { name: name, breed: breed, color: color }
    this.horseDataService.createRandomHorse(this.horseValues, this.Uid, this.breedIdSelected, this.colorIdSelected, this.skillSelected, name)
    return alert(this.success);
  }

  getHorseData(): HorseData[] {
    let test = this.horseDataService.getHorsesByUid().subscribe(
      res => this.allHorseData = res);
    //console.log(this.allHorseData);
    return this.allHorseData;
  }

  horseSelecteId: string;
  selectedHorse(event: any) {
    this.horseSelecteId = (<HTMLInputElement>event.target).id;
  }

  onSelectHorse() {
    this.authService.sethorseId(this.horseSelecteId)
  }
}
