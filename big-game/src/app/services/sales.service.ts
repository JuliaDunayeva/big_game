import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Sale } from '../sale';


@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(public db: AngularFirestore,
    private authService:AuthService) { }

  
  horsesForSale() {
    return this.db.collection('sales').valueChanges()
  }

  horseSaleList() {
      return this.db.collection('sales').snapshotChanges()
  }

  sellHorse (value) {
    let today = new Date();
    return this.db.collection('sales').add({
      horseId: this.authService.getHorseId(),
      sellerId: this.authService.getUId(),
      sellDate: today,
      price: 500,
      sold: false,
    })
  }

  buyHorse (value) {
    let today = new Date();
    return this.db.collection('sales').add({
      buyerId: this.authService.getUId(),
      buyDate: today,
      sold: true,
    })
  }
}