import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HorseData } from '../horse-data';
import { EqCenters } from '../eq-centers';
import { Observable, from } from 'rxjs';
import { EqcenterComponent } from '../eqcenter/eqcenter.component';
import { EqcenterRegisterComponent } from '../eqcenter-register/eqcenter-register.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EqCenterService {

  constructor(public db: AngularFirestore) { }

  geteqCenters() {
		return this.db.collection('eqCenters').valueChanges();
  }

  getdata(horse: HorseData):HorseData{
   return
//return  setWithOptions
  }
  
  getCurrentEQCenter(id: string): Observable<EqCenters> {
      return this.db.collection('eqCenters').doc(id).snapshotChanges().pipe(
        map((res) => {
          const eq = res.payload.data() as EqCenters;
          //horse.id = res.payload.id;
  
          return eq;
        })
      );
    

    
  }
}
