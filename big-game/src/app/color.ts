export class Color {
	public key: string;
	public color: string;
	public color_id: number;
	public img_file: string;

	constructor(key: string, color: string, color_id: number, img_file: string) {
		this.key = key;
		this.color = color;
		this.color_id = color_id;
		this.img_file = img_file;
	}

	getColor(): string {
		return this.color;
	}

	getImageFile(): string {
		return this.img_file;
	}
}
