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

	getUid(): string {
		return sessionStorage.getItem('uid');
	}

	getHorseId(): string {
		return sessionStorage.getItem('horseid')
	}
}
