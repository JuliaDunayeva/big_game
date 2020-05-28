import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../user-data';
import { UserDataService } from '../services/user-data.service';
import { HorseData } from '../horse-data';
import { HorseDataService} from '../services/horse-data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.css']
})
 
export class HorseListComponent implements OnInit {
    public id: string;
    public uid: string;
    public horse: HorseData;
    public allHorseData: HorseData[];
    public userData: UserData[];

    constructor(private router: ActivatedRoute, 
        private http: HttpClient,
        public userDataService: UserDataService,
        public horseDataService: HorseDataService,
    public authService: AuthService) {
    //    this.uid = this.router.snapshot.params.id
    
    }
    ngOnInit(): void {
        //this.uid=this.authService.getUId();
        this.getHorse();
    }
  
  addHorse(){
    
  }

/*getHorseByUid() {
   return this.db.collection('/horse_data', ref =>  ref.where('userId', '==', sessionStorage.getItem('uid')))
   .valueChanges();
}*/

getHorse(){
  setTimeout(() => 
  {

    this.horseDataService.getHorsesByUid().subscribe(res => {
   // console.log(res)
    //this.horse=
    this.authService.sethorseId(res[0].payload.doc.id);
    this.id=res[0].payload.doc.id;
    //sessionStorage.setItem('horseid',this.id);
    console.log('got horse id ->> '+this.id);
    //this.horse=res[0].payload.doc;
    });
 }, 750);
}

}
