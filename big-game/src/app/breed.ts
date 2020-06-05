export class Breed {
	public id: string;
	public breed: string;
	public skill: string;
	public img_path: string;

	constructor(id: string, breed: string, skill: string, img_path: string) {
		this.id = id;
		this.breed = breed;
		this.skill = skill;
		this.img_path = img_path;
	}

}
