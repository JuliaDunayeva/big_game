import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play-bar',
  templateUrl: './play-bar.component.html',
  styleUrls: ['./play-bar.component.css'],
})
export class PlayBarComponent implements OnInit {
  
  id:any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.id=sessionStorage.getItem('UId');
  }
  
}
