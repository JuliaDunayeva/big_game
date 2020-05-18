import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
//import { SignUpComponent } from '../sign-up/sign-up.component'

//import { HorseCollection } from './horse-collection';
import { HttpClient } from '@angular/common/http';
import { getLocaleDateFormat } from '@angular/common';
import { Color } from '../color';
import { ColorService } from '../services/color.service';
import { BreedService } from '../services/breed.service';
import { Breed } from '../breed';
import { UserData } from '../user-data';
import { UserDataService } from '../services/user-data.service';
import { HorseData } from '../horse-data';
import { HorseDataService} from '../services/horse-data.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-horse-page',
  templateUrl: './horse-page.component.html',
  styleUrls: ['./horse-page.component.css']
})

export class HorsePageComponent implements OnInit {

  colors: Color[] = [];
  allColors: Color[];
  allBreeds: Breed[];
  allSkills: string[];
  allHorseData: HorseData[];
  skill: string;
  userData: UserData[];
    
  constructor(private router: Router, 
    private http: HttpClient,
    public colorService: ColorService, 
    public breedService: BreedService,
    public userDataService: UserDataService,
    public HorseDataService: HorseDataService) { }
   // public 

  createdata(){
    this.userDataService.createdata();
    //let db: AngularFirestore;
/*    let docRef = db.collection('testdata').doc('user');

let setAda = docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
});*/
/*let data = {
  name: 'Los Angeles',
  state: 'CA',
  country: 'USA'
};

// Add a new document in collection "cities" with ID 'LA'
let setDoc = db.collection('testdata').doc('user').set(data);
*/
console.log('add user');
  }
    ngOnInit(): void {
    //SignUpComponent.getColors();
this.getBreeds();
this.getColors();   
this.getUserData(); 
this.getHorseData();
    //SignUpComponent.getBreeds();
  }
  public isLCollapsed = false;
  public isRCollapsed = false;

  public isLCollapsed1 = false;
  public isRCollapsed1 = false;

  public isLCollapsed2 = false;
  public isRCollapsed2 = false;

  public isLCollapsed3 = false;
  public isRCollapsed3 = false;

  public isLCollapsed4 = false;
  public isRCollapsed4 = false;

  public isMCollapsed =false;

  public rating=1;
  
  active = 1;

  ctrl = new FormControl(null, Validators.required);

  public preventchange_1:true;

  public readonly = true;

  public value = 0;

  public userIndex=1;
  
  //this.ctrl.disable();

   toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }

  getBreeds(): Breed[]{
    this.breedService.getBreeds().subscribe(
      result => {
        console.log(result);
        this.allBreeds = result as Array<Breed>;
        // for (let i = 0 ; i < this.allBreeds.length ; i++) {
        //   this.allSkills.push(this.allBreeds[i].skill)
        // }
        console.log(this.allBreeds[0].skill);
        // console.log(this.allSkills);
      }
    )
    return this.allBreeds;
  }

  getColors(): Color[] {
    this.colorService.getColors().subscribe(
      result =>{
        console.log(result);
        this.allColors = result as Array<Color>;
        console.log(this.allColors[0].color)
      }
    )
    return this.colors;
  }

  getUserData(): UserData[] {
    this.userDataService.getUserData().subscribe(
      result =>{
        console.log(result);
        this.userData = result as Array<UserData>;
        console.log(this.userData[0].userName);
      }
    )
    return this.userData;
  }

  getHorseData(): HorseData[] {
    this.HorseDataService.getHorseData().subscribe(
      result =>{
        console.log(result);
        this.allHorseData = result as Array<HorseData>;
        console.log(this.allHorseData[0].stamina)
      }
    )
    return this.allHorseData;
  }
 
 public beforeChange($event: NgbPanelChangeEvent) {

    if ($event.panelId === 'preventchange_1' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

}
