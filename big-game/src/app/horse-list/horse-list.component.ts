import { Component, OnInit } from '@angular/core';
import { HorseDataService} from '../services/horse-data.service';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.css']
})
export class HorseListComponent implements OnInit {

  public id:string;

  constructor(  private horseDataService: HorseDataService) { }

  ngOnInit(): void {
    this.getHorse();
  }

  getHorse(){
    setTimeout(() => 
    {
      this.horseDataService.getHorsesByUid().subscribe(res => {
     // console.log(res)
      //this.horse=
      this.id=res[0].payload.doc.id;
      sessionStorage.setItem('horseID',this.id);
      console.log('got horse id');
      //this.horse=res[0].payload.doc;
      });
   }, 750);
  }
}
