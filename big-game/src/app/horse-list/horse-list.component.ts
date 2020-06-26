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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.css'],
  providers: [DatePipe]
})

export class HorseListComponent implements OnInit {
  skills = ['Stamina','Gallop', 'Speed', 'Jumping'];
  success = 'A new horse has been added';
  fail = 'You do not have enough Equus';
  notnow = 'Your horse is too young to retire';
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
  newEquus: number;
  horse: HorseData;
  horseValues: { name, breed, color };
  selectHorse: FormGroup
  defaultHorse: any;

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
      sessionStorage.setItem("selected-horse","false");
      /*document.getElementById("selected-horse").className = "disabled";
      document.getElementById("selected-horse").setAttribute("routerLink", "");*/
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
    this.horseService.getHorseList().subscribe(
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
    if (this.haveMoney == true) {
    this.horseService.createRandomHorse(this.horseValues, this.Uid, breedId, colorId, skill, name)
      return alert(this.success);
    } alert(this.fail)
  }

  newHorseCost(){
   this.userService.subtractEquus(this.Uid, this.user.equus, 1000)
  } // used to buy a new horse and pay 1000 Equus

  haveMoney: boolean;
  costCheck(){
    if(this.user.equus >= 1000){
      this.newHorseCost();
      return this.haveMoney = true;
    } 
    else{
      return this.haveMoney = false;
    }
  }

  selectedHorse(event: any) {
    sessionStorage.setItem("selected-horse", "true");
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
    this.userService.addEquus(this.Uid, this.user.equus, 500)
  }  // used to sell the horse and collect 500 Equus

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
  }
  
  diffIndob:any;
  retireHorse(){
    const timestamp = Date.now()/1000;
    this.diffIndob = this.dobofHorse.seconds-timestamp
    if (this.diffIndob <-605000) {
    this.delete();
    }else{
      alert(this.notnow);
    }
  }
}