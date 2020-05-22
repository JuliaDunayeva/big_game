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
  
  createUser(value) {
    return this.db.collection('user_data').add({
      userName: value.username,
      password: value.password,
      email: value.email
      
    })
  }

  logInUser(form) {
    return this.db.collection('/user_data', ref => ref.where('email', '==', form.value.email)
    .where('password', '==', form.value.password)).snapshotChanges();
  }
  
}
