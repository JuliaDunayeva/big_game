import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Color } from '../color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(public db: AngularFirestore) { }

  getColors() {
    return this.db.collection('/color').snapshotChanges()
  }

  getColorById(id: string) {
    return this.db.collection('color').doc(id).ref.get()
  }
  
}
