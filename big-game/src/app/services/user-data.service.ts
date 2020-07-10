import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserData } from '../user-data';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  id: string = this.authService.getUId()

  constructor(public db: AngularFirestore,
    private authService: AuthService) { }

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
  addPasses(id: string, passes: number, addingPasses: number) {
    return this.db.collection('user_data').doc(id).update({
      'passes': passes + addingPasses
    })
  } // adds value to passes

  subtractPasses(id: string, passes: number, minusPasses: number) {
    return this.db.collection('user_data').doc(id).update({
      'passes': passes - minusPasses
    })
  } // subtracts value from passes

  addEquus(id: string, equus: number, addingEquus: number) {
    return this.db.collection('user_data').doc(id).update({
      'equus': equus + addingEquus
    })
  } // adds value to equus

  subtractEquus(id: string, equus: number, minusEquus: number) {
    return this.db.collection('user_data').doc(id).update({
      'equus': equus - minusEquus
    })
  } // subtracts value from equus

  updateName(id: string, username: string){
   return this.db.collection('user_data').doc(id).update({
     'userName': username
   })
  }
  
  updateEmail(id: string, email: string){
    return this.db.collection('user_data').doc(id).update({
      'email': email
    })
   }

   updatePass(id: string, password: string){
    return this.db.collection('user_data').doc(id).update({
      'password': password
    })
   }
}
