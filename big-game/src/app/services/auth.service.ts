import { Injectable } from '@angular/core';
//import { Color } from '../color';
//import { Breed } from '../breed';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor() {}

	setUid(Uid: string) {
		sessionStorage.setItem('uid', Uid);
		//this.uid=Uid;
	}

	setHorseId(horseId: string) {
		sessionStorage.setItem('horseId', horseId)
	}

	getUId():string {
		//return this.uid;
		return sessionStorage.getItem('uid');
	}

	getHorseId(): string {
		return sessionStorage.getItem('horseId')
	}
}
