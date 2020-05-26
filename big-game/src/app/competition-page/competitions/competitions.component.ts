import { Component, OnInit } from '@angular/core';
import { Breed } from 'src/app/breed';
import { BreedService } from 'src/app/services/breed.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {

  allBreeds: Breed[];
  

  constructor(private breedService: BreedService) { 

  }

  ngOnInit(): void {
    this.getBreeds()
  }

  getBreeds(): Breed[] {
		this.breedService.getBreeds().subscribe((result) => {
			console.log(result);
			this.allBreeds = result as Array<Breed>;
		});
		return this.allBreeds;
	}

}
