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

  getBreeds(): Observable<any> {
    return this.db.collection('/breed').snapshotChanges()
  }

  getBreedById(id: string){
    return this.db.collection('breed').doc(id).ref.get()
  }
  
}
