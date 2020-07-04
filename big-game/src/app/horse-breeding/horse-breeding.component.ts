import { Component, OnInit } from '@angular/core';
import { HorseDataService } from '../services/horse-data.service';
import { HorseData } from '../horse-data';
import { Breed } from '../breed';
import { BreedService } from '../services/breed.service';
import { AuthService } from '../services/auth.service';
import { ColorService } from '../services/color.service';
import { Color } from '../color';
import { UserDataService } from '../services/user-data.service';
import { UserData } from '../user-data';

@Component({
  selector: 'app-horse-breeding',
  templateUrl: './horse-breeding.component.html',
  styleUrls: ['./horse-breeding.component.css']
})
export class HorseBreedingComponent implements OnInit {
  haveMoney: boolean;
  mareData: HorseData = new HorseData;
  allBreeds: Breed[];
  allColors: Color[];
  allHorseData: Array<HorseData>;
  img_file: string;
  img_path: string;
  user: any;
  userInfo: UserData;
  stallionUserInfo:UserData;
  Uid: string = this.authService.getUId();
  public mareBreedId: string;
  public marecolorId: string;
  public imagePath: string;
  public horse: HorseData = new HorseData;
  public stallionUserEquus:number;
  success = 'A new horse is born';
  fail = 'You do not have enough Equus for this stallion';

  public id: string = this.authService.getHorseId();
  constructor(private horseService: HorseDataService,
    private breedService: BreedService,
    private authService: AuthService,
    private userService: UserDataService,
    private colorService: ColorService,) { }

  ngOnInit(): void {
    this.getMaredata();
    this.getBreeds();
    this.getColors();
    this.getUserData();
    this.getStallionHorseData()
  }

  
  getMaredata() {
    this.horseService.getHorseById(this.id).subscribe((res) => {
      this.mareData = res as HorseData;
      this.mareBreedId = this.mareData.breed;
      this.marecolorId = this.mareData.color;
      console.log('first',this.mareBreedId);
      this.breedService.getBreedById(this.mareData.breed).then(brd => {
        this.mareData.breed = brd.data()['breed'];
        this.img_path = brd.data()['img_path'];
      })
      this.colorService.getColorById(this.mareData.color).then(clr => {
        this.mareData.color = clr.data()['color'];
        this.img_file = clr.data()['img_file'];
        this.LoadHorseImage()
      })
    });
  }

  getStallionHorseData() {
    console.log('test',this.mareBreedId);
    this.horseService.getHorseForMare().subscribe(
      res => {
        this.allHorseData = res as Array<HorseData>
        this.allHorseData.map(horse => {
          this.breedService.getBreedById(horse.breed).then(res => {
            horse.breed = res.data()['breed']
          }
          )
        }
        )
        this.allHorseData.map(horse => {
          this.colorService.getColorById(horse.color).then(res =>
            horse.color = res.data()['color']
          )
        }
        )
      }
    )
  }


  selectedStallion(userID:string){
    if (this.haveMoney == true) {
        this.userService.getUserByID(userID).subscribe((result) => {
          this.stallionUserInfo = result as UserData;
          this.stallionUserEquus = this.stallionUserInfo.equus;
        });
        this.addmoney(userID, this.stallionUserInfo.equus);
    }
  }

  addmoney(userID:string, equus:number){
    this.userService.addEquus(userID, equus, 500);
  }
  
  newHorseCost() {
    this.userService.subtractEquus(this.Uid, this.userInfo.equus, 750)
  }

  LoadHorseImage() {
    this.imagePath = 'assets/images/horses/';
    this.imagePath += `${this.img_path}/${this.img_file}`
    console.log(this.imagePath)
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

  getUserData() {
    this.userService.getUserByID(this.Uid).subscribe((res) => {
      this.userInfo = res as UserData;
      console.log(this.userInfo.equus);
    })
  }

 
  costCheck() {
    if (this.userInfo.equus < 750) {
      return this.haveMoney = false;
    }
    else {
      this.haveMoney = true;
    };
  } 

  createBaby(name:string) {
    if (this.haveMoney == true) {
      this.horseService.newBaby( this.Uid, this.mareBreedId, this.mareBreedId, this.mareData.skill, name)
      this.newHorseCost();
      return alert(this.success);
    } alert(this.fail)
  }
}
