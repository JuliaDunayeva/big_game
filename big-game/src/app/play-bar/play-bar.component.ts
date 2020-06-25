import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play-bar',
  templateUrl: './play-bar.component.html',
  styleUrls: ['./play-bar.component.css'],
})

export class PlayBarComponent implements OnInit {
  
  id:any;
  horseselected:boolean=false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (sessionStorage.getItem("selected-horse")=="true"){
      this.horseselected=true;
    } else {
      this.horseselected=false;
    }
    
    this.id=sessionStorage.getItem('horseId');
  }
}
