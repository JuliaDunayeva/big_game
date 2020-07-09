import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EqCenters } from '../eq-centers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EqCenterService {

  constructor(public db: AngularFirestore) { }

  geteqCenters() {
		return this.db.collection('eqCenters').valueChanges();
  }

  getCurrentEQCenter(id: string): Observable<EqCenters> {
      return this.db.collection('eqCenters').doc(id).snapshotChanges().pipe(
        map((res) => {
          const eq = res.payload.data() as unknown as EqCenters;
          return eq;
        })
      );
  }
}
