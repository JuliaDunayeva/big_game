export class Breed {
        key: string;
        breed: string;
        breed_id: number;
        skill: string;

    constructor(key: string, breed: string, breed_id: number, skill: string) {
        this.key = key;
        this.breed = breed;
        this.breed_id = breed_id;
        this.skill = skill;
    }
}
