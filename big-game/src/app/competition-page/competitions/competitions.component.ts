import { Component, OnInit } from '@angular/core';
import { Breed } from 'src/app/breed';
import { BreedService } from 'src/app/services/breed.service';
import { CompetitionService } from 'src/app/services/competition.service';


@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {

  allBreeds: Breed[];

  constructor(private breedService: BreedService, private competitionService: CompetitionService) { 

  }

  ngOnInit(): void {
    this.getBreeds()
    //this.competitionService.createCompetition("gervan")
  }

  getBreeds(): Breed[] {
		this.breedService.getBreeds().subscribe((result) => {
			console.log(result);
			this.allBreeds = result as Array<Breed>;
		});
		return this.allBreeds;
  }
  
  createCompetition(comp_name, breed) {
    console.log(comp_name, breed)
    this.competitionService.createCompetition(comp_name, breed)
    
  }

}
