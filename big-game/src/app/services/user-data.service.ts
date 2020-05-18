import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserData } from '../user-data';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

    constructor(public db: AngularFirestore) { }

  createdata(){
    let data = {
      userName:'new testy splity 2',
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA'
    };
    
    // Add a new document in collection "cities" with ID 'LA'
    let setDoc = this.db.collection('testdata').doc("testuser2").set(data);
    
    //let setDoc = this.db.collection('testdata').doc('user').set(data);
  }
  getUserData() {
    return this.db.collection('/testdata').valueChanges()
  }
}
