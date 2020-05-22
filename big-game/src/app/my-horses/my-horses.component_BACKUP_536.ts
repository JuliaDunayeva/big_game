import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../user-data';
import { UserDataService } from '../services/user-data.service';
import { HorseData } from '../horse-data';
import { HorseDataService} from '../services/horse-data.service';
=======
import { UserDataService } from '../services/user-data.service';
>>>>>>> d150f4eafeae825261399df7dbc3a09837ab46b4

@Component({
  selector: 'app-my-horses',
  templateUrl: './my-horses.component.html',
  styleUrls: ['./my-horses.component.css']
})

export class MyHorsesComponent implements OnInit {

public id: string;
public uid: string;
public horse: HorseData;
public allHorseData: HorseData[];
public userData: UserData[];

  constructor(private router: ActivatedRoute, 
    private http: HttpClient,
    public userDataService: UserDataService,
    public horseDataService: HorseDataService) {
      this.uid = this.router.snapshot.params.id
    }

    ngOnInit(): void {
      //this.router.snapshot.params.id
      this.horseDataService.getHorseById(this.id).subscribe(res => {
        this.horse = res;
      })
     
      this.getUserData(); 
      this.getHorseData();
    }
  
  addHorse(){
    
  }

  getUserData(): UserData[] {
    this.userDataService.getUserData().subscribe(
      result =>{
        //console.log(result);
        this.userData = result as Array<UserData>;
        //console.log(this.userData[0].password);
      }
    )
    return this.userData;
  }

  getHorseData(): HorseData[] {
    this.horseDataService.getHorses(this.uid).subscribe(
            result =>{
              console.log(result);
              this.allHorseData = result as Array<HorseData>;
              //console.log(this.allHorseData[0].stamina)
            }
        );
     // console.log(this.allHorseData);
	return this.allHorseData;
  }

  // onSubmit() {
	
	// 			this.horseService
	// 				.createRandomHorse(this.signupForm.value, this.skillSelected, res.id)
	// 				.subscribe((h) => {
	// 					this.router.navigate([ 'horse-page/' + h.id ]);
	// 				});
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// }
}