import { Injectable } from '@angular/core';
import { Equipment } from './../equipment';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { EquipmentComponent } from '../store-page/equipment/equipment.component';

@Injectable({
  providedIn: 'root'
})

export class SaddlesService {
  Equipment: Equipment[];
  saddle: string;

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
   
  createSaddle(name: string,color: string, equipment: string,img_file: string,id: string,group: string,
    dressage_: number,gallop_: number,jumping_: number,speed_: number,stamina_: number,trot_: number,cost: number):Observable<DocumentReference> {
      return from(
        this.db.collection('/saddles').add({
          name: name,
          color: color, 
          equipment: equipment,
          img_file: img_file,
          id: id,
          group: group,
          dressage_: dressage_,
          gallop_: gallop_,
          jumping_: jumping_,
          speed_: speed_,
          stamina_: stamina_,
          trot_: trot_,
          cost: cost,
        })
      );
  }

  deleteSaddle(saddles: Array<Equipment> ) {
    for (let i = 0; i < saddles.length; i++){
      console.log(saddles[i].saddleId);
       this.db.collection('/saddles').doc(saddles[i].saddleId).delete()
    }
  }//end of delete function 
  
  updateSaddle(name: string,color: string, equipment: string,img_file: string,id: string,group: string,
    dressage_: number,gallop_: number,jumping_: number,speed_: number,stamina_: number,trot_: number,cost: number) {
      return this.db.collection('/saddles').doc(this.saddle).update({
          'name': name,
          'color': color, 
          'equipment': equipment,
          'img_file': img_file,
          'id': id,
          'group': group,
          'dressage_': dressage_,
          'gallop_': gallop_,
          'jumping_': jumping_,
          'speed_': speed_,
          'stamina_': stamina_,
          'trot_': trot_,
          'cost': cost,
        })
    }// end of updateSaddle function

}
