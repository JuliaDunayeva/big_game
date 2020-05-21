import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { HorseData } from '../horse-data';
import { IfStmt } from '@angular/compiler';

@Injectable({
	providedIn: 'root'
})
export class HorseDataService {
	name: string = '';

	constructor(public db: AngularFirestore) {}

	getHorseByID(id : string) : Observable<HorseData> {
		return this.db.collection('/horse_data').doc(id).snapshotChanges().pipe(
			map(res => { 
				const horse = res.payload.data() as HorseData;
				return horse;
			})			
		);
	}

	getHorseData() {
		return this.db.collection('/horse_data').valueChanges();
	}

	getRandStats(): number {
		return Math.floor(Math.random() * 100 + 1);
	}

	getRandGender(): string {
		if (Math.random() < 0.5) {
			return 'stallion';
		}
		return 'mare';
	}

	createRandomHorse(value, userId): Observable<DocumentReference> {
		let stamina = this.getRandStats();
		let speed = this.getRandStats();
		let gallop = this.getRandStats();
		let trot = this.getRandStats();
		let jumping = this.getRandStats();
		let dressage = this.getRandStats();
		let gender = this.getRandGender();
		let today = new Date();
		return from(
			this.db.collection('/horse_data').add({
				breed: value.breed,
				skill: value.skill,
				color: value.color,
				name: 'Watermelon II',
				gender: gender,
				userId: userId,
				stamina: stamina,
				speed: speed,
				gallop: gallop,
				dressage: dressage,
				trot: trot,
				jumping: jumping,
				dob: today,
				height: 14.5,
				weight: 400,
				energy: 100,
				health: 50,
				morale: 10,
				dayTime: 24,
				tr_stamina: 0,
				tr_speed: 0,
				tr_gallop: 0,
				tr_trot: 0,
				tr_jumping: 0
			})
		);
	}
}
