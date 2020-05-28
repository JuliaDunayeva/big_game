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

	getUId() {
		sessionStorage.getItem('uid');
	}

	getHorseId() {
		sessionStorage.getItem('horseid')
	}
}
