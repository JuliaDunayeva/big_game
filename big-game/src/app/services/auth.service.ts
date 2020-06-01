import { Injectable } from '@angular/core';
//import { Color } from '../color';
//import { Breed } from '../breed';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private horseid:string;
	private uid:string;

	//public colors:Color[];
	//public breeds:Breed[];

	constructor() {}

	setUid(Uid: string) {
		sessionStorage.setItem('uid', Uid);
		//this.uid=Uid;
	}

	sethorseId(horseId: string) {
		sessionStorage.setItem('horseid', horseId)
		//this.horseid=horseId;
	}

	getUId():string {
		//return this.uid;
		return sessionStorage.getItem('uid');
	}

	getHorseId(): string {
		//return this.horseid;
		return sessionStorage.getItem('horseid')
	}
}
