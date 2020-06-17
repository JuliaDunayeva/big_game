import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Color } from '../color';

@Injectable({
  providedIn: 'root'
})

export class ColorService {

  constructor(public db: AngularFirestore) {}

  //get all colors listed in firebase
  getColors() {
    return this.db.collection('/color').snapshotChanges()
  }

  // get the color info from firebase (@param: id is 'color' in horse_data ref in firebase)
  getColorById(id: string) {
    return this.db.collection('color').doc(id).ref.get()
  }
}
