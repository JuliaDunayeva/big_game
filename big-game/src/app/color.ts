export class Color {
	private key: string;
	private color: string;
	private color_id: number;
	private img_file: string;

	constructor(key: string, color: string, color_id: number, img_file: string) {
		this.key = key;
		this.color = color;
		this.color_id = color_id;
		this.img_file = img_file;
	}

	getColor(): string {
		return this.color;
	}
}
