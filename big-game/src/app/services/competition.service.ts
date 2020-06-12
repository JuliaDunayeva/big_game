import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Compete } from '../compete';
import { BreedService } from './breed.service';

@Injectable({
	providedIn: 'root'
})
export class CompetitionService {
	compName: string;
	difficulty: number;
	energy: number;
	kitty: number;
	ranks: number;
	breed: string;
	over: boolean;
	raceDate: Date;
	compType: string;
	Compete: Compete[];

	constructor(public db: AngularFirestore, private breedService: BreedService) {}

	getCompetitions() {
		return this.db.collection('competitions', ref=> ref.where('over','==', false)).valueChanges();
	}

	createCompetition(compName: string, breed: string, compType: string) {
		//  console.log(comp_name);
		this.compName = compName;
		this.compType = compType;
		this.breed = breed;
		this.difficulty = this.getRandStats();
		this.energy = this.getRandStats();
		this.kitty = this.getRandValue();
		this.ranks = this.getRandRank();
		this.over = false;
		let today = new Date();
		this.db.collection('competitions').add({
			compName: compName,
			difficulty: this.difficulty,
			energy: this.energy,
			kitty: this.kitty,
			ranks: this.ranks,
			breed: breed,
			over: this.over,
			raceDate: today,
			compType: compType,
		});

	}

	getRandStats(): number {
		return Math.floor(Math.random() * 10 + 10);
	}

	getRandValue(): number {
		return Math.floor(Math.random() * 1000 + 1);
	}

	getRandRank(): number {
		return Math.floor(Math.random() * 10 + 1);
	}
}
