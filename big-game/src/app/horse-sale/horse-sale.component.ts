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
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';


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

  // saleList: Sale[];

  constructor(private authService: AuthService,
        public db: AngularFirestore,
        private userService: UserDataService,
        private horseService: HorseDataService,
        private fb: FormBuilder,
        private breedService: BreedService,
        private salesService: SalesService ) { }

    ngOnInit(): void {
      // this.getHorseListForSale();
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
            // console.log(this.allHorseData)
            this.breedService.getBreedById(horse.breed).then( res =>{
              horse.breed = res.data()['breed']}
              )
            }
          )
        }
      )
    }

    // getHorseListForSale() {
    //   this.salesService.horseSaleList().subscribe(res => 
    //     {this.saleList = res.map( res => 
    //       {   
    //       if (!res.payload.doc.data()['sold']) {
    //             return {
    //               horseId: res.payload.doc.data()['horseId'],
    //               sellerId:res.payload.doc.data()['sellerId'],
    //               sellDate: res.payload.doc.data()['sellDate'],
    //               buyerId: res.payload.doc.data()['buyerId'],
    //               buyDate: res.payload.doc.data()['buyDate'],
    //               sold: res.payload.doc.data()['sold'],
    //               price: res.payload.doc.data()['price']
    //             }
    //         }
    //       }
    //     )
    //     // console.log("saleList ", this.saleList)
    //     }
    //   ) 
    // }

    createForm() {
      console.log(this.defaultHorse)
      this.selectHorse = this.fb.group({
        myHorse: [this.defaultHorse, Validators.required]
      })
    }
  
    // selectedHorse(event: any) {
    //   console.log("1st horse ID ",(<HTMLInputElement>event.target).id)
    //   this.horseSelectedId = (<HTMLInputElement>event.target).id;
    // }
  
    onSelectHorse() {
      this.authService.setHorseId(this.horseSelectedId)
    }

    newId: string;  
    userId: string;
    idOfHorse: string;
    saleOfHorse: boolean;
    onHorseSelect(id, userId, toSell: boolean) {
      // console.log('2nd user ID ', userId, toSell, id);
      this.idOfHorse = id;
      this.newId = this.userId;
      // console.log('change? ', userId)
      this.saleOfHorse = toSell;
    }
    
    swapUser(){
      // console.log('swap from ', this.saleOfHorse);
      const toSell = this.setSale(this.saleOfHorse)
      this.horseService.updateTheSale(this.idOfHorse, toSell)
      const userId = this.setUser(this.newId)
      this.horseService.updateTheUser(this.idOfHorse, userId)
      // console.log('swap to ', toSell, userId);
    }
   
    setSale(toSell: boolean): boolean {
      if(toSell == false) {
        return true
      } 
      return false 
    }

    setUser(userId: string): string {
      // console.log ('old user', userId)
      userId = this.authService.getUId()
      // console.log ('new user', userId)
      return userId
    }

}
