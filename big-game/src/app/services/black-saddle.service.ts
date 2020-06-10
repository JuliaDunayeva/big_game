import { BlackSaddles } from './../black-saddles';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class BlackSaddleService {
  blackSaddlesCollection: AngularFirestoreCollection<BlackSaddles>;
  blackSaddles: BlackSaddles[];

  constructor(public bafs: AngularFirestore ) {
    this.blackSaddlesCollection = this.bafs.collection('blackSaddles'); 
   }

   getBlackSaddles(){
    return this.bafs.collection('blackSaddles').snapshotChanges()
  }
}
