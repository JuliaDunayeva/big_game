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
          /*document.getElementById("selected-horse").className = "";
          document.getElementById("selected-horse").setAttribute("routerLink", "/horse-page");*/
      } else {
          this.horseselected=false;
          /*document.getElementById("selected-horse").className = "disabled";
          document.getElementById("selected-horse").setAttribute("routerLink", "");*/
      }
    this.id=sessionStorage.getItem('horseId');
  }
}
