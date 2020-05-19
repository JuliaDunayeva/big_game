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

  getUserData() {
    return this.db.collection('/user_data').valueChanges()
  }
  
}
