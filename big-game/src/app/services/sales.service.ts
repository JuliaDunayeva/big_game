import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { HorseData } from '../horse-data';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(public db: AngularFirestore,
    private authService:AuthService) { }
    
    getHorseByID(id : string) : Observable<HorseData> {
		return this.db.collection('/horse_data').doc(id).snapshotChanges().pipe(
			map(res => { 
				const horse = res.payload.data() as HorseData;
				horse.id = res.payload.id;
				return horse;
			})			
		);
	}//end of getHorsesByID()
}
