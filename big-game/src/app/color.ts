export class Color {
	public id: string;
	public color: string;
	public img_file: string;

	constructor(id: string, color: string, img_file: string) {
		this.color = color;
		this.id = id;
		this.img_file = img_file;
	}
}
