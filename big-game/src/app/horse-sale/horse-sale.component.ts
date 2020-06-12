import { Component, OnInit } from '@angular/core';
import { UserData } from '../user-data';
import { UserDataService } from '../services/user-data.service';
import { HorseData } from '../horse-data';
import { HorseDataService} from '../services/horse-data.service';
import { SalesService } from '../services/sales.service';
import { BreedService } from '../services/breed.service';
import { Breed } from '../breed';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-horse-sale',
  templateUrl: './horse-sale.component.html',
  styleUrls: ['./horse-sale.component.css']
})
export class HorseSaleComponent implements OnInit {
  allHorses: Breed[];
  allHorseData: Array<HorseData>;
  horse: HorseData;
  horseValues: { name, breed, color };
  selectHorse: FormGroup
  defaultHorse: any;
  horseSelectedId: string;
  Uid: string = this.authService.getUId();
  user: any;

  constructor(private authService: AuthService,
        public db: AngularFirestore,
        private userService: UserDataService,
        private horseService: HorseDataService,
        private fb: FormBuilder,
        private breedService: BreedService,
         ) { }

    ngOnInit(): void {
      this.getHorseData();
      this.userService.getUserByID(this.Uid).subscribe((result) => {
        this.user = result as UserData;
      });
        console.log('uid', this.authService.getUId())
    }

    getHorseData(){
      this.horseService.getHorsesForSale().subscribe(
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
        }
      )
    }

    createForm() {
      console.log(this.defaultHorse)
      this.selectHorse = this.fb.group({
        userHorse: [this.defaultHorse, Validators.required]
      })
    }
  
    onSelectHorse() {
      this.authService.setHorseId(this.horseSelectedId)
    }

    newId: string;  
    userId: string;
    idOfHorse: string;
    saleOfHorse: boolean;
    onHorseSelect(id, userId, toSell: boolean) {
      this.idOfHorse = id;
      this.newId = this.userId;
      this.saleOfHorse = toSell;
    }
    
    swapUser(){
      const toSell = this.setSale(this.saleOfHorse)
      this.horseService.updateTheSale(this.idOfHorse, toSell)
      const userId = this.setUser(this.newId)
      this.horseService.updateTheUser(this.idOfHorse, userId)
    }
   
    setSale(toSell: boolean): boolean {
      if(toSell == false) {
        return true
      } 
      return false 
    }

    setUser(userId: string): string {
      userId = this.authService.getUId()
      return userId
    }
}
