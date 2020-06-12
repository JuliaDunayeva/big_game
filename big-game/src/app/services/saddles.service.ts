import { Injectable } from '@angular/core';
import { Equipment } from './../equipment';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class SaddlesService {
  Equipment: Equipment[];

  constructor(public db: AngularFirestore) { }

  getSaddlesList() {
    return this.db.collection('saddles').snapshotChanges()
  }

}
