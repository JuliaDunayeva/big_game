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

@Injectable({
	providedIn: 'root'
})
export class HorseDataService {
	/* Default name when creating a new horse */
	name: string = 'Watermelon I';

	constructor(
		public db: AngularFirestore,
		private authService:AuthService) {}
/* Get horse data for currently logged in user */
	getHorsesByUid() : Observable<HorseData[]>{
		return this.db.collection('/horse_data', ref => ref.where('userId', '==', this.authService.getUId()))
		.snapshotChanges().pipe(
			map(action => {
			return action.map(res =>{
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
	getHorsesForSale() : Observable<HorseData[]>{
		return this.db.collection('/horse_data', ref => ref.where('toSell', '==', true))
		.snapshotChanges().pipe(
			map(action => {
			return action.map(res =>{
				const horse = res.payload.doc.data() as HorseData;
				const id = res.payload.doc.id;
				return { id, ...horse };
				})
			})
		);
	}// end of getHorsesForSale function
/* write data back to database */
	setHorseMorale(horse:HorseData){
		let cityRef = this.db.collection('/horse_data').doc(horse.id);
		let setWithOptions = cityRef.set({
			"morale":horse.morale
		}, {merge: true});
	} // end of setHorseMorale()
/* write data back to database */
	setHorseHealth(horse:HorseData){
		let cityRef = this.db.collection('/horse_data').doc(horse.id);
		let setWithOptions = cityRef.set({
			"health":horse.health
		}, {merge: true});
	}//end of setHorseHealth()
/* write data back to database */
	setHorseEnergy(horse:HorseData){
		let cityRef = this.db.collection('/horse_data').doc(horse.id);
		let setWithOptions = cityRef.set({
		  "energy":horse.energy
		}, {merge: true});
	}//end of setHorseEnergy()
/* write data back to database */
	setHorseTime(horse:HorseData,currentHourString:string,currentMinuteString:string){
		let cityRef = this.db.collection('/horse_data').doc(horse.id);
		let setWithOptions = cityRef.set({
		  "time": {currentHourString, currentMinuteString}
		}, {merge: true});
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
	createRandomHorse(value, userId: string, breedId:string, colorId:string, skill:string, name?: string): Observable<DocumentReference> {
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
				time: {currentHourString: "24", currentMinuteString: "00"},
				toSell: false,
			})
		);
	}//end of createRandomHorse()
/* Get horse data using provided id */
	getHorseById(id: string): Observable<HorseData> {
		return this.db.collection('/horse_data').doc(id).snapshotChanges().pipe(
			map((res) => {
				const horse = res.payload.data() as HorseData;
				horse.id=res.payload.id;
				
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
/* Update time used on horse page */
	updateHorseTime(time: Time, hour: number, minute: number): number {
		let id = this.authService.getHorseId();
		let updatedTime: Time 
		
		//get the new time
		updatedTime = this.calculateNewTime(time, hour, minute)
		//update the database with new time
		this.db.collection('horse_data').doc(id).update({ 'time': updatedTime })

		//return the number of seconds divided by 240 to return a circle degree
		let percent = Math.floor(
									(
										(Number(updatedTime.currentHourString) * 3600 
										 + Number(updatedTime.currentMinuteString) * 60)
									) / 240 * (100/360)
								)
		console.log("time: ", updatedTime, "percent: ", percent);
		
		return percent;
	}//end of updateHorseTime function
/* Calculate new time for use on the horse page */
	calculateNewTime(time: Time, hour: number, minute: number): Time{
		let updatedTime: Time = {currentHourString: '', currentMinuteString: ''}
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
		if ( newMinute == 0 && newHour == 0) {
			newHour = 24;
		} else if (newMinute < 0 ){
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
		return updatedTime
	} // end of calculateNewTime function
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
} // end of horse data service
