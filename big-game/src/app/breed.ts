export class Breed {
	public doc_id?: string;
	public key: string;
	public breed: string;
	public breed_id: number;
	public skill: string;
	public img_path: string;

	constructor(doc_id: string, key: string, breed: string, breed_id: number, skill: string, img_path: string) {
		this.doc_id = doc_id;
		this.key = key;
		this.breed = breed;
		this.breed_id = breed_id;
		this.skill = skill;
		this.img_path = img_path;
	}

	getBreed(): string {
		return this.breed
	}

	getSkill(): string {
		return this.skill
	}

	getImagePath(): string {
		return this.img_path;
	}
}
