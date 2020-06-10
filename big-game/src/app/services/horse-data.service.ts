import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { HorseData } from '../horse-data';
import { AuthService } from './auth.service';
import { BreedService } from './breed.service';
import { ColorService } from './color.service';

interface Time {
	currentHourString: string,
	currentMinuteString: string
  }

@Injectable({
	providedIn: 'root'
})
export class HorseDataService {
	name: string = 'Watermelon I';

	constructor(
		public db: AngularFirestore,
		private authService:AuthService,
		private breedService: BreedService) {}

	getHorseByID(id : string) : Observable<HorseData> {
		return this.db.collection('/horse_data').doc(id).snapshotChanges().pipe(
			map(res => { 
				const horse = res.payload.data() as HorseData;
				horse.id = res.payload.id;
				return horse;
			})			
		);
	}//end of getHorsesByID()

	getHorsesByUid() : Observable<HorseData[]>{
		return this.db.collection('/horse_data', ref => ref.where('userId', '==', sessionStorage.getItem('uid')))
		.snapshotChanges().pipe(
			map(action => {
			return action.map(res =>{
				const horse = res.payload.doc.data() as HorseData;
				const id = res.payload.doc.id;
				this.authService.setHorseId(id);
				return { id, ...horse };
				})
			})
		);
	}// end of GetHorsesByUid()

	getHorsesForSale() : Observable<HorseData[]>{
		return this.db.collection('/horse_data', ref => ref.where('toSell', '==', true))
		.snapshotChanges().pipe(
			map(action => {
			return action.map(res =>{
				const horse = res.payload.doc.data() as HorseData;
				const id = res.payload.doc.id;
				this.authService.setHorseId(id);
				return { id, ...horse };
				})
			})
		);
	}// end of getHorsesForSale()

	setHorseMorale(id:string,num:number){
		let cityRef = this.db.collection('/horse_data').doc(id);
		let setWithOptions = cityRef.set({
			"morale":num
		}, {merge: true});
	} // end of setHorseMorale()

	setHorseHealth(id:string,num:number){
		let cityRef = this.db.collection('/horse_data').doc(id);
		let setWithOptions = cityRef.set({
			"health":num
		}, {merge: true});
	}//end of setHorseHealth()

	setHorseEnergy(id:string, num:number){
		let cityRef = this.db.collection('/horse_data').doc(id);
		let setWithOptions = cityRef.set({
		  "energy":num
		}, {merge: true});
	}//end of setHorseEnergy()

	setHorseTime(id:string,currentHourString:string,currentMinuteString:string){
		let cityRef = this.db.collection('/horse_data').doc(id);
		let setWithOptions = cityRef.set({
		  "time": {currentHourString, currentMinuteString}
		}, {merge: true});
	}//end of setHorseTime()
	

	getHorseData() {
		return this.db.collection('/horse_data', ref => ref.where('userId', '==', sessionStorage.getItem('uid'))).valueChanges()
	}

	getRandStats(): number {
		return Math.floor(Math.random() * 100 + 1);
	}//end of getRandStats()

	getRandGender(): string {
		if (Math.random() < 0.5) {
			return 'stallion';
		}
		return 'mare';
	} //end of getRandGender()

	SetUserIDForHorse(horseid:string,userId:string){
		let cityRef = this.db.collection('/horse_data').doc(horseid);
		let setWithOptions = cityRef.set({
			"userId":userId
		}, {merge: true});
	} //end of SetUserIDForHorse()

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
	

	getHorseById(id: string): Observable<HorseData> {
		return this.db.collection('/horse_data').doc(id).snapshotChanges().pipe(
			map((res) => {
				const horse = res.payload.data() as HorseData;
				horse.id=res.payload.id;
				
				return horse;
			})
		);
	}
	 
	updateHorseGender(id: string, gender: String) {
		return this.db.collection('/horse_data').doc(id).update({
			'gender': gender
		})
	}

	updateHorseTime(time: Time, hour: number, minute: number): number {
		let id = this.authService.getHorseId();
		let updatedTime: Time 
		
		//get the new time
		updatedTime = this.calculateNewTime(time, hour, minute)
		//update the database with new time
		this.db.collection('horse_data').doc(id).update({ 
			'time': updatedTime
		})

		//return the number of seconds divided by 240 to return a circle degree
		let percent = Math.floor(
									(
										(Number(updatedTime.currentHourString)*3600 
										 + Number(updatedTime.currentMinuteString)*60)
									)
									/ 240
									*(100/360)
								)
		console.log("time: ", updatedTime, "percent: ", percent);
		
		return percent;
	}

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
	}

	updateTheSale(id: string, toSell: boolean) {
		return this.db.collection('/horse_data').doc(id).update({
			'toSell': toSell
		})
	}

	updateTheUser(id: string, userId: string) {
		return this.db.collection('/horse_data').doc(id).update({
			'userId': userId
		})
	}
}
