export class Breed {
	public key: string;
	public breed: string;
	public breed_id: number;
	public skill: string;
	public img_path: string;

	constructor(key: string, breed: string, breed_id: number, skill: string, img_path: string) {
		this.key = key;
		this.breed = breed;
		this.breed_id = breed_id;
		this.skill = skill;
		this.img_path = img_path;
	}

	getBreed(): string {
		return this.breed
	}
}
