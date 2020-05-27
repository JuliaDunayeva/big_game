import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Compete } from '../compete';
import { Breed } from '../breed';
import { BreedService } from './breed.service';

@Injectable({
	providedIn: 'root'
})
export class CompetitionService {
	comp_name: string;
	difficulty: number;
	energy: number;
	kitty: number;
	ranks: number;
	over: boolean;

	constructor(public db: AngularFirestore, private breedService: BreedService) {}

	getCompetitions() {
		return this.db.collection('/competitions').valueChanges();
	}

	createCompetition(comp_name: string, breed: string) {
		//  console.log(comp_name);
		this.comp_name = comp_name;
		this.difficulty = this.getRandStats();
		this.energy = this.getRandStats();
		this.kitty = this.getRandValue();
		this.ranks = this.getRandRank();
		this.over = false;

		this.db.collection('competitions').add({
			comp_name: comp_name,
			difficulty: this.difficulty,
			energy: this.energy,
			kitty: this.kitty,
			ranks: this.ranks,
			breed: breed,
			over: this.over
		});
	}

	getRandStats(): number {
		return Math.floor(Math.random() * 10 + 10);
	}

	getRandValue(): number {
		return Math.floor(Math.random() * 1000 + 1);
	}

	getRandRank(): number {
		return Math.floor(Math.random() * 10);
	}
}
