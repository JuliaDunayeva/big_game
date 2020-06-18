import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { HorseData } from '../horse-data';
import { AuthService } from './auth.service';
/* interface for use by horse time functions */
interface Time {
	currentHourString: string,
	currentMinuteString: string
}
interface Age {
	year: number,
	month: number,
	day: number
}

@Injectable({
	providedIn: 'root'
})
export class HorseDataService {
	/* Default name when creating a new horse */
	name: string = 'Watermelon I';

	constructor(
		public db: AngularFirestore,
		private authService: AuthService) { }
	/* Get horse data for currently logged in user */
	getHorsesByUid(): Observable<HorseData[]> {
		return this.db.collection('/horse_data', ref => ref.where('userId', '==', this.authService.getUId()))
			.snapshotChanges().pipe(
				map(action => {
					return action.map(res => {
						const horse = res.payload.doc.data() as HorseData;
						const id = res.payload.doc.id;
						return { id, ...horse };
					})
				})
			);
	} // end of getHorsesByUid function

	getHorseList(): Observable<HorseData[]> {
		return this.db.collection('/horse_data', ref => ref.where('userId', '==', this.authService.getUId()).where('toSell', '==', false))
			.snapshotChanges().pipe(
				map(action => {
					return action.map(res => {
						const horse = res.payload.doc.data() as HorseData;
						const id = res.payload.doc.id;
						return { id, ...horse };
					})
				})
			);
	} // end of getHorsesByUid function

	/* returns a single horse by user */
	getHorseData() {
		return this.db.collection('/horse_data', ref => ref.where('userId', '==', this.authService.getUId())).valueChanges()
	} //  end of getHorseData function


	/* Get data for horses that are for sale */
	getHorsesForSale(): Observable<HorseData[]> {
		return this.db.collection('/horse_data', ref => ref.where('toSell', '==', true))
			.snapshotChanges().pipe(
				map(action => {
					return action.map(res => {
						const horse = res.payload.doc.data() as HorseData;
						const id = res.payload.doc.id;
						return { id, ...horse };
					})
				})
			);
	}// end of getHorsesForSale function
	/* write data back to database */
	setHorseMorale(horse: HorseData) {
		let id=this.authService.getHorseId();
		let cityRef = this.db.collection('/horse_data').doc(id);
		let setWithOptions = cityRef.set({
			"morale": horse.morale
		}, { merge: true });
	} // end of setHorseMorale()
	/* write data back to database */
	setHorseHealth(horse: HorseData) {
		let id=this.authService.getHorseId();
		let cityRef = this.db.collection('/horse_data').doc(id);
		let setWithOptions = cityRef.set({
			"health": horse.health
		}, { merge: true });
	}//end of setHorseHealth()
	/* write data back to database */
	setHorseEnergy(horse: HorseData) {
		let id=this.authService.getHorseId();
		let cityRef = this.db.collection('/horse_data').doc(id);
		let setWithOptions = cityRef.set({
			"energy": horse.energy
		}, { merge: true });
	}//end of setHorseEnergy()
	/* write data back to database */
	setHorseTime(horse: HorseData, currentHourString: string, currentMinuteString: string) {
		let id=this.authService.getHorseId();
		let cityRef = this.db.collection('/horse_data').doc(id);
		let setWithOptions = cityRef.set({
			"time": { currentHourString, currentMinuteString }
		}, { merge: true });
	}//end of setHorseTime()
	/* Randomly generate stats when creating a new horse */
	getRandStats(): number {
		return Math.floor(Math.random() * 100 + 1);
	}//end of getRandStats()
	/* Randomly select horse gender */
	getRandGender(): string {
		if (Math.random() < 0.5) {
			return 'stallion';
		}
		return 'mare';
	} //end of getRandGender()
	/* Create new horse using random data*/
	createRandomHorse(value, userId: string, breedId: string, colorId: string, skill: string, name?: string): Observable<DocumentReference> {
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
				breed: breedId,
				skill: skill,
				color: colorId,
				name: name,
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
				tr_jumping: 0,
				time: { currentHourString: "24", currentMinuteString: "00" },
				age: { year: 10, month: 1, day: 1 },
				toSell: false,
				stud: false,
			})
		);
	}//end of createRandomHorse()
	/* Get horse data using provided id */
	getHorseById(id: string): Observable<HorseData> {
		return this.db.collection('/horse_data').doc(id).snapshotChanges().pipe(
			map((res) => {
				const horse = res.payload.data() as HorseData;
				horse.id = res.payload.id;

				return horse;
			})
		);
	}// end of getHorseById function
	/* Update horse gender */
	updateHorseGender(id: string, gender: String) {
		return this.db.collection('/horse_data').doc(id).update({
			'gender': gender
		})
	} // end of updateHorseGender function

	updateHorseAge(id, age) {
		this.db.collection('horse_data').doc(id).update({
			age: age
		})
	}

	/* Update time used on horse page */
	updateHorseTime(time: Time, age, hour: number, minute: number): number {
		let id = this.authService.getHorseId();
		let updatedTime: Time
		let updated: { time: Time, age: Age }
		//get the new time
		updated = this.calculateNewTime(time, age, hour, minute)
		//update the database with new time
		this.db.collection('horse_data').doc(id).update({ 'time': updated.time })
		this.db.collection('horse_data').doc(id).update({ 'age': updated.age })

		//return the number of seconds divided by 240 to return a circle degree
		let percent = Math.floor(
			(
				(Number(updated.time.currentHourString) * 3600
					+ Number(updated.time.currentMinuteString) * 60)
			) / 240 * (100 / 360)
		)
		console.log("time: ", updated.time, "percent: ", percent);

		return percent;
	}//end of updateHorseTime function
	/* Calculate new time for use on the horse page */
	calculateNewTime(time: Time, age: Age, hour: number, minute: number): { time: Time, age: Age } {
		let updated: { time: Time, age: Age }
		let updatedTime: Time = { currentHourString: '', currentMinuteString: '' }
		let updatedAge: Age = age;
		let newHour: number;
		let newMinute: number;


		/*retrieving the current time hour and minute from 'time' property
		and using Number() to convert them to number*/
		let currentHour = Number(time.currentHourString)
		let currentMinute = Number(time.currentMinuteString)

		//calculate the new left hour and minute
		newHour = Number(currentHour) - Number(hour)
		newMinute = Number(currentMinute) - Number(minute)

		//updating updatedTime currentMinuteString property
		if (newMinute == 0 && newHour == 0) {
			newHour = 24;
			//updating age day
			updatedAge.day++;
			//updating age month
			updatedAge = this.updateAge(updatedAge);
		} else if (newMinute < 0) {
			newHour--;
			newMinute = Math.abs(newMinute);
		}

		//updating updatedTime currentHourString property
		while (newHour < 0) {
			newHour = 24 + newHour;
		}

		/* new time Object to update database */
		//update hour and minute property with the new strings
		updatedTime.currentHourString = newHour.toString()
		updatedTime.currentMinuteString = newMinute.toString()

		//check if the hour and minute strings are 1 digit, add 0 before them.
		if (updatedTime.currentMinuteString.length == 1) {
			updatedTime.currentMinuteString = "0" + updatedTime.currentMinuteString;
		}
		if (updatedTime.currentHourString.length == 1) {
			updatedTime.currentHourString = "0" + updatedTime.currentHourString;
		}
		updated = { time: updatedTime, age: updatedAge }
		return updated;
	}
	updateAge(age: Age): Age {
		let updatedAge: Age = age;

		//update month
		if (updatedAge.day == 30 && updatedAge.month == 2) {
			updatedAge.day = 1;
			updatedAge.month++
		} else if (updatedAge.day == 31 && (updatedAge.month == 4 || 6 || 9 || 10)) {
			updatedAge.day = 1;
			updatedAge.month++
		} else if (updatedAge.day == 32) {
			updatedAge.day = 1;
			updatedAge.month++;
		}

		//update year
		if (updatedAge.month == 13) {
			updatedAge.month = 1;
			updatedAge.year++
		}

		return updatedAge
	}
	// end of calculateNewTime function
	/* Next two functions are used for selling a horse */

	updateTheSale(id: string, toSell: boolean) {
		return this.db.collection('/horse_data').doc(id).update({
			'toSell': toSell
		})
	} // end of updateTheSale function

	updateTheUser(id: string, userId: string) {
		return this.db.collection('/horse_data').doc(id).update({
			'userId': userId
		})
	}// end of updateTheUser function

	deleteHorsedata(id: string) {
		return this.db.collection('/horse_data').doc(id).delete()
	}//end of delete function 

	getHorseForMare() {
		return this.db.collection('/horse_data', ref => ref.where('gender', '==', 'stallion' ).where('stud', '==', true))
		.snapshotChanges().pipe(
			map(action => {
				return action.map(res => {
					const horse = res.payload.doc.data() as HorseData;
					const id = res.payload.doc.id;
					return { id, ...horse };
				})
			})
		);
	}
} // end of horse data service
