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
import { Sale } from '../sale';


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
  saleList: Sale[];


  constructor(private authService: AuthService,
        private userDataService: UserDataService,
        private horseDataService: HorseDataService,
        private fb: FormBuilder,
        private breedService: BreedService,
        private salesService: SalesService ) { }

    ngOnInit(): void {
      this.getHorseListForSale();
      this.getHorseData();
      this.userDataService.getUserByID(this.Uid).subscribe((result) => {
        this.user = result as UserData;
      });
    }

    getHorseData(){
      this.horseDataService.getHorsesByUid().subscribe(
        res => {
          this.allHorseData = res as Array<HorseData>;
          this.allHorseData.map(horse =>{
            this.defaultHorse = this.allHorseData[0].name
            this.horseSelectedId = this.allHorseData[0].id
            this.createForm();
            console.log(this.allHorseData)
            this.breedService.getBreedById(horse.breed).then( res =>{
              horse.breed = res.data()['breed']}
              )
            }
          )
        }
      )
    }

    getHorseListForSale() {
      this.salesService.horseSaleList().subscribe(res => 
        {this.saleList = res.map( res => 
          {   
          if (!res.payload.doc.data()['sold']) {
                return {
                  horseId: res.payload.doc.data()['horseId'],
                  sellerId:res.payload.doc.data()['sellerId'],
                  sellDate: res.payload.doc.data()['sellDate'],
                  buyerId: res.payload.doc.data()['buyerId'],
                  buyDate: res.payload.doc.data()['buyDate'],
                  sold: res.payload.doc.data()['sold'],
                  price: res.payload.doc.data()['price']
                }
            }
          }
        )
        console.log("saleList ", this.saleList)
        }
      ) 
    }

    horsesForSale() {
      this.salesService.horsesForSale()
      return this.db.collection('sales').valueChanges()
    }

    createForm() {
      console.log(this.defaultHorse)
      this.selectHorse = this.fb.group({
        myHorse: [this.defaultHorse, Validators.required]
      })
    }
  
    selectedHorse(event: any) {
      console.log("test ",(<HTMLInputElement>event.target).id)
      this.horseSelectedId = (<HTMLInputElement>event.target).id;
    }
  
    onSelectHorse() {
      this.authService.setHorseId(this.horseSelectedId)
    }

}
