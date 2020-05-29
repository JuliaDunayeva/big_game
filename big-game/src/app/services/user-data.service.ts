import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserData } from '../user-data';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private passes: number = 100;
  private equus: number = 2500;
  private created: Date;

  constructor(public db: AngularFirestore) { }

  getUserData() {
    return this.db.collection('/user_data').valueChanges()
  }
  
  public getHorseID(value):string{
    return value;
  }

  createUser(value) {
    let today = new Date();
    return this.db.collection('user_data').add({
      userName: value.username,
      password: value.password,
      email: value.email,
      equus: value.equus,
      passes: value.passes,
      created: today,
    })
  }

  getUserByID(uid : string) : Observable<UserData> {
		return this.db.collection('/user_data').doc(uid).snapshotChanges().pipe(
			map(res => { 
				const user = res.payload.data() as UserData;
				return user;
			})			
		);
	}

  logInUser(form) {
    //sessionStorage.setItem('setting','nothing');
    return this.db.collection('/user_data', ref => ref.where('email', '==', form.value.email)
    .where('password', '==', form.value.password)).snapshotChanges();
  }

  signUpUser(form) {
    return this.db.collection('/user_data', ref =>
     ref.where('email', '==', form.value.email)).snapshotChanges();
  }
  
}
