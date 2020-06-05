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

  // get all the breeds listed in firebase
  getBreeds(): Observable<any> {
    return this.db.collection('/breed').snapshotChanges()
  }

  // get the breed info from firebase (@param: id is 'breed' in horse_data ref in firebase)
  getBreedById(id: string){
    return this.db.collection('breed').doc(id).ref.get()
  }
  
}
