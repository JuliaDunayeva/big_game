import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../user-data';
import { UserDataService } from '../services/user-data.service';
import { HorseData } from '../horse-data';
import { HorseDataService} from '../services/horse-data.service';
import { AuthService } from '../services/auth.service';
import { BreedService } from '../services/breed.service';
import { Breed } from '../breed';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
//import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.css']
})
 
export class HorseListComponent implements OnInit {

    public allBreeds: Breed[];
	public breedSelected: string;
    public id: string; // horse id
    public uid: string; // user id
    public horse: HorseData; // current horse data
    public allHorseData: HorseData[]; 
    public userData: UserData[];
    db: any;

constructor(private router: ActivatedRoute, private breedService: BreedService,
        private http: HttpClient,
        public userDataService: UserDataService,
        public horseDataService: HorseDataService,
        public authService: AuthService) {
}

ngOnInit(): void {
    this.getHorse();
} // end of ngOnInit()
  
addHorse(){
} //end of addHorse()

getHorse(){
  setTimeout(() => 
  {
    this.horseDataService.getHorsesByUid().subscribe(res => {
        this.authService.sethorseId(res[0].payload.doc.id);
        this.id=res[0].payload.doc.id;
        console.log('got horse id ->> '+this.id);
    }); //end of getHorsesByUid() callback
 }, 750); //end of setTimeout() callback
}//end of getHorse()

} //end of component