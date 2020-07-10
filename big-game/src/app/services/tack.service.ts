import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TackService {
  horse_id: string;

  constructor(private db: AngularFirestore
    ) { }

  buyTack(horse_id: string, saddle_id: string, cost:number){
    console.log('data', horse_id, saddle_id, cost)
    let today = new Date();
    return this.db.collection('/horse_tack').add({
      horse_id: horse_id,
      saddle_id: saddle_id,
      cost: cost,
      buy_date: today,
    })
  }

  sellTack(saddle_id: string) {
    return this.db.collection('horse_tack').doc(saddle_id).delete()
  }

  getTackByHorse(horse_id) {
    return this.db.collection('horse_tack', ref => ref.where('horse_id', '==', horse_id)).snapshotChanges()
  }


}

