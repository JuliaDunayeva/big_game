import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EqCenterService {

  constructor(public db: AngularFirestore) { }

  geteqCenters() {
		return this.db.collection('eqCenters').valueChanges();
	}
}
