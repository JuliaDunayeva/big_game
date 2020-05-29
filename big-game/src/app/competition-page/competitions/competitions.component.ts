import { Component, OnInit } from '@angular/core';
import { Breed } from 'src/app/breed';
import { BreedService } from 'src/app/services/breed.service';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
	selector: 'app-competitions',
	templateUrl: './competitions.component.html',
	styleUrls: [ './competitions.component.css' ]
})
export class CompetitionsComponent implements OnInit {
	allBreeds: Breed[];
	breedSelected: string;
	compTypes = ['Trotting','Barrel Racing', 'Reining', 'Cutting', 'Trail Class', 'Western Pleasure'];
	success = 'New Competition Created';

	constructor(private breedService: BreedService, private competitionService: CompetitionService) {}

	ngOnInit(): void {
		this.getBreeds();
	}

	getBreeds(): Breed[] {
		this.breedService.getBreeds().subscribe((result) => {
			console.log(result);
			this.allBreeds = result as Array<Breed>;
		});
		return this.allBreeds;
	}

	createCompetition(
		compName: string,
		breed: string, 
		compType: string) {
		this.competitionService.createCompetition(compName, breed, compType);
		return alert(this.success);
	}

}
