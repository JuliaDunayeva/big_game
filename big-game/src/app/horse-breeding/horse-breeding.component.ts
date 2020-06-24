import { Component, OnInit } from '@angular/core';
import { HorseDataService } from '../services/horse-data.service';
import { HorseData } from '../horse-data';
import { Breed } from '../breed';
import { BreedService } from '../services/breed.service';
import { AuthService } from '../services/auth.service';
import { ColorService } from '../services/color.service';
import { Color } from '../color';

@Component({
  selector: 'app-horse-breeding',
  templateUrl: './horse-breeding.component.html',
  styleUrls: ['./horse-breeding.component.css']
})
export class HorseBreedingComponent implements OnInit {

  mareData:HorseData = new HorseData;
  allBreeds: Breed[];
  allColors: Color[];
  allHorseData: Array<HorseData>;
  img_file: string;
  img_path: string;
  public imagePath: string;
  public horse: HorseData = new HorseData;

  public id: string = this.authService.getHorseId();
  constructor(private horseService: HorseDataService,
    private breedService: BreedService,
    private authService: AuthService,
    private colorService: ColorService,) { }

  ngOnInit(): void {
    this.getStallionHorseData();
    this.getMaredata();
    this.getBreeds();
    this.getColors();
  }

  getStallionHorseData() {
    this.horseService.getHorseForMare().subscribe(
      res => {
        this.allHorseData = res as Array<HorseData>
        this.allHorseData.map(horse =>{
          this.breedService.getBreedById(horse.breed).then( res =>{
            horse.breed = res.data()['breed']}
            )
          }
        )
        this.allHorseData.map(horse =>{
          this.colorService.getColorById(horse.color).then( res =>
            horse.color = res.data()['color']
            )
          }
        )
      }
    )
  }
  
  getMaredata(){
       this.horseService.getHorseById(this.id).subscribe((res) => {
         this.mareData = res as HorseData;
         console.log(this.mareData)
         this.breedService.getBreedById(this.mareData.breed).then( brd =>
        { 
           this.mareData.breed = brd.data()['breed'];
            this.img_path = brd.data()['img_path'];
            console.log('brred',this.img_path)
         })
        this.colorService.getColorById(this.mareData.color).then( clr =>
        {
          this.mareData.color = clr.data()['color'];
          this.img_file = clr.data()['img_file'];
          console.log('color',this.img_file)
          this.LoadHorseImage()
        })
        });
  } 

  LoadHorseImage() {
		this.imagePath = 'assets/images/horses/';
    this.imagePath += `${this.img_path}/${this.img_file}`
    console.log(this.imagePath)
  }
  
  getBreeds() {
		this.breedService.getBreeds().subscribe((brd) => {
        this.allBreeds = brd.map(res => {
        	return {
            		id: res.payload.doc.id,
            		breed: res.payload.doc.data()['breed'],
            		skill: res.payload.doc.data()['skill'],
            		img_path: res.payload.doc.data()['img_path']
          		}
        	});
      });
  }

  getColors() {
  this.colorService.getColors().subscribe(clr => {
      this.allColors = clr.map(res => {
        return {
            id: res.payload.doc.id,
            color: res.payload.doc.data()['color'],
            img_file: res.payload.doc.data()['img_file']
          }
        });
    });
  }
}
