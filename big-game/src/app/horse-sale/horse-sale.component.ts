import { Component, OnInit } from '@angular/core';
import { UserData } from '../user-data';
import { UserDataService } from '../services/user-data.service';
import { HorseData } from '../horse-data';
import { HorseDataService} from '../services/horse-data.service';
import { SalesService } from '../services/sales.service';
import { BreedService } from '../services/breed.service';
import { Breed } from '../breed';
import { ColorService } from '../services/color.service';
import { Color } from '../color';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  breedService: any;
  colorService: any;

  constructor(private authService: AuthService,
        private userDataService: UserDataService,
        private horseDataService: HorseDataService,
        private fb: FormBuilder) { }

    ngOnInit(): void {
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
      console.log(this.defaultHorse)
      this.selectHorse = this.fb.group({
        myHorse: [this.defaultHorse, Validators.required]
      })
    }
  
    selectedHorse(event: any) {
      console.log("test   ",(<HTMLInputElement>event.target).id)
      this.horseSelectedId = (<HTMLInputElement>event.target).id;
    }
  
    onSelectHorse() {
      this.authService.setHorseId(this.horseSelectedId)
    }

}
