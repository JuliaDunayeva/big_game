import { Component, OnInit } from '@angular/core';
import { HorseDataService } from '../services/horse-data.service';
import { HorseData } from '../horse-data';
import { AuthService } from '../services/auth.service';
import { BreedService } from '../services/breed.service';
import { ColorService } from '../services/color.service';
import { UserData } from '../user-data';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-black-market-page',
  templateUrl: './black-market-page.component.html',
  styleUrls: ['./black-market-page.component.css']
})

export class BlackMarketPageComponent implements OnInit {
  success = 'You have changed the horse gender';
  fail = 'You do not have enough Passes';
  Name: string ;
  allHorses: HorseData[];
  selectedHorse:string;
  gender: string;
  Uid: string = this.authservice.getUId();
  user: any;
  userInfo: UserData;
  allmales: HorseData[];

  constructor(private horseService: HorseDataService,
    private authservice: AuthService,
    private userService: UserDataService,
    private breedService: BreedService,
    private colorService: ColorService) {}

  ngOnInit(): void {
    this.getHorses();
    this.getUserData();
    this.showStallions();
  }

  getHorses() {
    this.horseService.getHorsesByUid().subscribe(
      res => {
        this.allHorses = res as Array<HorseData>;
      })
  }

  idOfHorse: string;
  genderOfHorse: string;
  onHorseSelect(gender: string, id) {
    this.genderOfHorse = gender
    this.idOfHorse = id;
  }

  horse:HorseData
  swapGender(){
    if (this.haveMoney == true) {
      const gender = this.defineGender(this.genderOfHorse)
      this.horseService.updateHorseGender(this.idOfHorse, gender)
      this.userService.subtractPasses(this.Uid, this.userInfo.passes, 95)
      alert(this.success)
    }
    else {
      alert(this.fail)
    }
  }

  defineGender(gender: string): string {
    if(gender === "mare") {
      return "stallion"
    } 
    return "mare"  
  }

  haveMoney: boolean;
    costCheck() {
      if (this.userInfo.passes < 95) {
        console.log(this.userInfo.passes)
        return this.haveMoney = false;
      }
      else {
        this.haveMoney = true;
    };
    console.log(this.costCheck)
  }

  getUserData(){
    this.userService.getUserByID(this.Uid).subscribe((res) => {
      this.userInfo = res as UserData;
    })
  }

  showStallions(){
    this.horseService.getStallions().subscribe(
      res => {
      this.allmales = res as Array<HorseData>
      });
  }

  idHorse: string;
  studStatusOfHorse: boolean;
  horseSelect(stud: boolean, id) {
    this.studStatusOfHorse = stud
    this.idHorse = id;
  }

  swapStudStatus(){
    if (this.haveMoney == true) {
      const stud = this.defineStudStatus(this.studStatusOfHorse)
      this.horseService.updateStudStatus(this.idHorse, stud)
      this.userService.subtractPasses(this.Uid, this.userInfo.passes, 50)
      alert(this.success)
    }
    else {
      alert(this.fail)
    }
  }

  defineStudStatus(stud: boolean): boolean {
    if(stud == false) {
      return true
    } 
    return false 
  }
}
