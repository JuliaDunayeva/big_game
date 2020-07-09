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

  getEquipmentList(group: string) {
    return this.db.collection('saddles', ref => ref.where("group", "==", group)).snapshotChanges()
  }

  getHorseSaddlesIds(horseId) {
    return this.db.collection('horse_tack', ref => ref.where('horse_id', '==', horseId)).snapshotChanges()
  }

  getHorseSaddlesNames(saddleId: string) {
    return this.db.collection('saddles').doc(saddleId).ref.get();
  }

}
