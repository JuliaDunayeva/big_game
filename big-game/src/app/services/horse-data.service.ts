import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { HorseData } from '../horse-data';

@Injectable({
	providedIn: 'root'
})
export class HorseDataService {
	name: string = 'Watermelon I';

	constructor(public db: AngularFirestore) {}

	getHorseByID(id : string) : Observable<HorseData> {
		return this.db.collection('/horse_data').doc(id).snapshotChanges().pipe(
			map(res => { 
				const horse = res.payload.data() as HorseData;
				return horse;
			})			
		);
	}

	getHorsesByUid() {
		return this.db.collection('/horse_data', ref => ref.where('userId', '==', sessionStorage.getItem('uid')))
		//.valueChanges();
		.snapshotChanges();
	}

	setHorseEnergy(id:string, num:number){
		let cityRef = this.db.collection('/horse_data').doc(id);

		let setWithOptions = cityRef.set({
		  "energy":num
		}, {merge: true});
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

	SetUserIDForHorse(horseid:string,userId:string){
		this.db.collection("/horse_data").doc(horseid).set(userId);
	}

	createRandomHorse(value, skill, userId): Observable<DocumentReference> {
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
				skill: skill,
				color: value.color,
				name: value.name,
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
				health: 80,
				morale: 50,
				dayTime: 24,
				tr_stamina: 0,
				tr_speed: 0,
				tr_gallop: 0,
				tr_trot: 0,
				tr_jumping: 0
			})
		);
	}

	getHorseById(id: string): Observable<HorseData> {
		return this.db.collection('/horse_data').doc(id).snapshotChanges().pipe(
			map((res) => {
				const horse = res.payload.data() as HorseData;
				return horse;
			})
		);
	}
}
