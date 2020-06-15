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
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.css']
})

export class HorseListComponent implements OnInit {
  skills = ['Stamina','Gallop', 'Speed', 'Jumping'];
  success = 'A new horse has been added';
  allBreeds: Breed[];
  allColors: Color[];
  allHorses: Breed[];
  allHorseData: Array<HorseData>;
  breedIdSelected: string;
  skillSelected: string;
  colorIdSelected: string;
  breed: string;
  skill: string;
  name: string;
  color: string;
  breedSelected: string;
  colorSelected: string;
  horseSelectedId: string;
  Uid: string = this.authService.getUId();
  user: any;
  newHorseCost: number = 1000;
  newEquus: number;
  horse: HorseData;
  horseValues: { name, breed, color };
  selectHorse: FormGroup
  defaultHorse: any;
  notnow = 'Its not the time to retire';

    constructor(private breedService: BreedService, 
        private colorService: ColorService, 
        private authService: AuthService,
        private userService: UserDataService,
        private horseService: HorseDataService,
        private fb: FormBuilder) {
    }

    ngOnInit(): void {
      this.getBreeds();
      this.getColors();
      this.getHorseData();
      this.userService.getUserByID(this.Uid).subscribe((result) => {
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
      })
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
    this.horseService.getHorsesByUid().subscribe(
      res => {
        this.allHorseData = res as Array<HorseData>;
        this.allHorseData.map(horse =>{
          this.defaultHorse = this.allHorseData[0].name
          this.horseSelectedId = this.allHorseData[0].id
          this.createForm();
          this.breedService.getBreedById(horse.breed).then( res =>{
            horse.breed = res.data()['breed']}
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

  createForm() {
    this.selectHorse = this.fb.group({
      userHorse: [this.defaultHorse, Validators.required]
    })
  }

  createRandomHorse(name: string, breedId: string, colorId: string, skill: string) {
    this.horseService.createRandomHorse(this.horseValues, this.Uid, breedId, colorId, skill, name)
    return alert(this.success);
  }

  selectedHorse(event: any) {
    this.horseSelectedId = (<HTMLInputElement>event.target).id;
  }

  onSelectHorse() {
    this.authService.setHorseId(this.horseSelectedId)
  }

  idOfHorse: string;
  saleOfHorse: boolean;
  onHorseSelect(id, toSell: boolean) {
    this.idOfHorse = id;
    this.saleOfHorse = toSell;
  }

  swapSale(){
    const toSell = this.setSale(this.saleOfHorse)
    this.horseService.updateTheSale(this.idOfHorse, toSell)
  }

  setSale(toSell: boolean): boolean {
    if(toSell == false) {
      return true
    } 
    return false 
  }

  delete(){
    this.horseService.deleteHorsedata(this.idOfHorse)
  }
  
  dobofHorse: any;
  onhorseRetire(id, dob:any){
    this.idOfHorse = id;
    this.dobofHorse =dob;
    console.log(this.dobofHorse);
  }
  
  diffIndob:any;
  retireHorse(){
    const timestamp = Date.now()/1000;
    this.diffIndob = this.dobofHorse.seconds-timestamp
    console.log(this.diffIndob )
    if (this.diffIndob <-605000) {
    this.delete();
    }else{
      alert(this.notnow);
    }
  }
}