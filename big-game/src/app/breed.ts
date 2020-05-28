export class Breed {
	private doc_id: string;
	private key: string;
	private breed: string;
	private breed_id: number;
	private skill: string;
	private img_path: string;

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

	getImagePath() {
		return this.img_path;
	}
}
