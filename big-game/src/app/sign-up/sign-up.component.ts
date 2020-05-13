import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HorseCollection } from './horse-collection';
import { HttpClient } from '@angular/common/http';
import { getLocaleDateFormat } from '@angular/common';
import { Color } from '../color';
import { ColorService } from '../services/color.service';
import { BreedService } from '../services/breed.service';
import { Breed } from '../breed';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  colors: Color[] = [];
  allColors: Color[];
  allBreeds: Breed[];

  constructor(private router: Router, 
              private http: HttpClient,
              public colorService: ColorService, 
              public breedService: BreedService) { }

  ngOnInit() {
   this.getColors();
   this.getBreeds();
  
  }

  getColors(): Color[] {
    this.colorService.getColors().subscribe(
      result =>{
        console.log(result);
        this.allColors = result as Array<Color>;
        console.log(this.allColors[0].color)
      }
    )
    return this.colors;
  }

  getBreeds(): Breed[]{
    this.breedService.getBreeds().subscribe(
      result => {
        console.log(result);
        this.allBreeds = result as Array<Breed>;
        console.log(this.allBreeds[0].breed)
      }
    )
    return ;
  }
}
