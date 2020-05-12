import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Color } from '../color';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(public db: AngularFirestore) { }

  getColors() {
    return this.db.collection('/color').valueChanges()
  }
}