import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HorseData } from '../horse-data'

@Injectable({
  providedIn: 'root'
})
export class HorseDataService {

  constructor(public db: AngularFirestore) { }

  getHorseData() {
    return this.db.collection('/horse-data').valueChanges()
  }
}
