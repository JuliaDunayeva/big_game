import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserData } from '../user-data';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  addPass: number = 2;
  addEq: number = 10;
  id: string = this.authService.getUId()

  constructor(public db: AngularFirestore, 
              private authService:AuthService) { }

  getUserData() {
    return this.db.collection('/user_data').valueChanges()
  }

  public getHorseID(value): string {
    return value;
  }

  createUser(value) {
    let today = new Date();
    return this.db.collection('user_data').add({
      userName: value.username,
      password: value.password,
      email: value.email,
      equus: 2500,
      passes: 100,
      created: today,
    })
  }

  getUserByID(uid: string): Observable<UserData> {
    return this.db.collection('user_data').doc(uid).snapshotChanges().pipe(
      map(res => {
        const user = res.payload.data() as UserData;
        return user;
      })
    );
  }

  logInUser(form) {
    //sessionStorage.setItem('setting','nothing');
    return this.db.collection('user_data', ref => ref.where('email', '==', form.value.email)
      .where('password', '==', form.value.password)).snapshotChanges();
  }

  signUpUser(form) {
    return this.db.collection('user_data', ref =>
      ref.where('email', '==', form.value.email)).snapshotChanges();
  }

  // Add and subtract values from the Equus and Passes
  addPasses(id: string, passes: number) {
    return this.db.collection('user_data').doc(id).update({
      'passes': passes + this.addPass
    })
  } // adds value to passes

  addEquus(id: string, equus: number) {
    return this.db.collection('user_data').doc(id).update({
      'equus': equus + this.addEq
    })
  } // adds value to equus

  subtractPasses(id: string, passes: number, minusPasses: number) {
    return this.db.collection('user_data').doc(id).update({
      'passes': passes - minusPasses
    })
  } // subtracts value from passes

  subtractEquus(id: string, equus: number, minusEquus: number) {
    return this.db.collection('user_data').doc(id).update({
      'equus': equus - minusEquus
    })
  } // subtracts value from equus

}
