import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Breed } from '../breed';

@Injectable({
  providedIn: 'root'
})
export class BreedService {

  constructor(public db: AngularFirestore) { }

  getBreeds() {
    return this.db.collection('/breed').snapshotChanges()
  }
  
}
