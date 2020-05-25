import { Injectable } from '@angular/core';
import { storage } from 'firebase';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(uid: string) {
		sessionStorage.setItem('uid', uid);
	}
}
