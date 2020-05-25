import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserData } from '../user-data';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  horse1_id:any;

  constructor(public db: AngularFirestore) { }

  getUserData() {
    return this.db.collection('/user_data').valueChanges()
  }
  
  public getHorseID(value):string{
    return value;
  }

  createUser(value,horse_id:string) {
  //  console.log(horse_id);

    this.horse1_id=horse_id;

    return this.db.collection('user_data').add({
      userName: value.username,
      password: value.password,
      email: value.email,
      horse1_id:horse_id
    })

    
  }

  getUsereByID(uid : string) : Observable<UserData> {
		return this.db.collection('/horse_data').doc(uid).snapshotChanges().pipe(
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
  
}
