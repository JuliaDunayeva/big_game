import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(public uid: string) {
		sessionStorage.setItem('uid', uid);
	}
}
