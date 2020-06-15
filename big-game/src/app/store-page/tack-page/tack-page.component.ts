import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tack-page',
  templateUrl: './tack-page.component.html',
  styleUrls: ['./tack-page.component.css']
})

export class TackPageComponent implements OnInit {
  public allHorses = [];
  constructor() {}

  ngOnInit(): void {
  }
}
