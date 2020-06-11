import { Injectable } from '@angular/core';
//import { Color } from '../color';
//import { Breed } from '../breed';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	//public horseid:string;
	//public uid:string;
	constructor() {}

	setUid(Uid: string) {
		sessionStorage.setItem('uid', Uid);
		//localStorage.setItem('uid', Uid);
		//this.uid=Uid;
	}

	setHorseId(horseId: string) {
		sessionStorage.setItem('horseId', horseId);
		//localStorage.setItem('horseId', horseId);
		//this.horseid=horseId;
	}

	getUId():string {
		//return this.uid;
		return sessionStorage.getItem('uid');
		//localStorage.getItem('uid');
	}

	getHorseId(): string {
		//return this.horseid;
		return sessionStorage.getItem('horseId')
		//localStorage.getItem('horseId');
	}
}
