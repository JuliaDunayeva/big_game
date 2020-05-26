export class Compete {
    comp_name: string;
	difficulty: number;
	energy: number;
    kitty: number;
    ranks: number;
    over: boolean;

constructor(comp_name: string, difficulty: number, energy: number, kitty: number, ranks: number) {
    this.comp_name = comp_name;
    this.difficulty = difficulty;
    this.energy = energy;
    this.kitty = kitty;
    this.ranks = ranks;
    this.over = false;
    }

}