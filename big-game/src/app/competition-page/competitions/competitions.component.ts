import { Component, OnInit } from '@angular/core';
import { Breed } from 'src/app/breed';
import { BreedService } from 'src/app/services/breed.service';
import { CompetitionService } from 'src/app/services/competition.service';
import { Compete } from '../../compete';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
	allCompetitions: Array<Compete>;
	theCompetitions: FormGroup;

	constructor(private breedService: BreedService, 
				private fb: FormBuilder, 
				private competitionService: CompetitionService) {}

	ngOnInit(): void {
		this.getBreeds();
		this.showCompetitions();
		console.log('competitions ', this.showCompetitions())
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
		})
	  }
	  
	createCompetition(
		compName: string,
		breed: string, 
		compType: string) {
		this.competitionService.createCompetition(compName, breed, compType);
		return alert(this.success);
	}

	showCompetitions() {
		this.competitionService.getCompetitions().subscribe(res => {
			this.allCompetitions = res as unknown as Array<Compete>;
			console.log('comps ', this.allCompetitions)
		})
	}
		
}
