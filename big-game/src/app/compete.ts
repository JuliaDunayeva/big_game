export class Compete {
  compName: string;
  difficulty: number;
  energy: number;
  kitty: number;
  ranks: number;
  over: boolean;
  breed: string;
  raceDate: Date;
  compType: string;

constructor(compName: string, difficulty: number, energy: number, kitty: number, 
             ranks: number, breed: string, compType: string, raceDate: Date) {
  this.compName = compName;
  this.difficulty = difficulty;
  this.energy = energy;
  this.kitty = kitty;
  this.ranks = ranks;
  this.breed = breed;
  this.over = false;
  this.compType = compType;
  this.raceDate = raceDate;
  }
}
