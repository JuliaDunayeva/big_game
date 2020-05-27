import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../user-data';
import { UserDataService } from '../services/user-data.service';
import { HorseData } from '../horse-data';
import { HorseDataService} from '../services/horse-data.service';

@Component({
  selector: 'app-my-horses',
  templateUrl: './my-horses.component.html',
  styleUrls: ['./my-horses.component.css']
})

export class HorseListComponent implements OnInit {

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
        this.userData = result as Array<UserData>;
      }
    )
    return this.userData;
  }

  getHorseData(): HorseData[] {
    this.horseDataService.getHorseById(this.uid).subscribe(
            result =>{
              console.log(result);
            }
        );
	return this.allHorseData;
  }