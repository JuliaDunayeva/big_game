import { Breed } from './breed';

export class Compete {
    comp_name: string;
	difficulty: number;
	energy: number;
    kitty: number;
    ranks: number;
    over: boolean;
    breed: string;

constructor(comp_name: string, difficulty: number, energy: number, kitty: number, ranks: number, breed: string) {
    this.comp_name = comp_name;
    this.difficulty = difficulty;
    this.energy = energy;
    this.kitty = kitty;
    this.ranks = ranks;
    this.breed = breed;
    this.over = false;
    }

}