import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor() {}

	setUId(uid: string) {
		sessionStorage.setItem('uid', uid);
	}
}
