import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Compete } from '../compete';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  comp_name: string;
  difficulty: number;
  energy: number;
  kitty: number;
  ranks: number;
  over: boolean;

  constructor(public db: AngularFirestore) { }

  getCompetitions() {
    return this.db.collection('/compete').valueChanges()
  }

  createCompetition (value, comp_name:string ): Observable<any> {
    //  console.log(comp_name);
      this.comp_name=comp_name;
      let difficulty = this.getRandStats();
      let energy = this.getRandStats();
      let kitty = this.getRandValue();
      let ranks = this.getRandRank();
      let over = false;
      
      return from(
        this.db.collection('compete').add({
        comp_name: comp_name,
        difficulty: difficulty,
        energy: energy,
        kitty: kitty,
        ranks: ranks,
        over: over,
      })
      );
    }

  getRandStats(): number {
    return Math.floor(Math.random() * 10 + 10);
  }

  getRandValue(): number {
    return Math.floor(Math.random() * 1000 + 1);
  }

  getRandRank(): number {
    return Math.floor(Math.random() * 10);
  }

}