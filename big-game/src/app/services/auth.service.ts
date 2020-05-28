import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor() {}

	setUId(uId: string) {
		sessionStorage.setItem('uid', uId);
	}

	sethorseId(horseId: string) {
		sessionStorage.setItem('horseid', horseId)
	}

	getUId():string {
		return sessionStorage.getItem('uid');
	}

	getHorseId():string {
		return sessionStorage.getItem('horseid')
	}
}
