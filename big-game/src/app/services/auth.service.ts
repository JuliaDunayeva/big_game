import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor() {}

	setUid(Uid: string) {
		sessionStorage.setItem('uid', Uid);
	}

	sethorseId(horseId: string) {
		sessionStorage.setItem('horseid', horseId)
	}

	getUid() {
		sessionStorage.getItem('uid');
	}

	getHorseId() {
		sessionStorage.getItem('hosreid')
	}
}
