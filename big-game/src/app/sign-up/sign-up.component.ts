import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HorseCollection } from './horse-collection';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  horseCollection: HorseCollection = new HorseCollection();

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.horseCollection.horses[0].name);
  }

}
