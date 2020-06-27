export class TackItems {
    public name: string = "";
    public imageFile: string = "";

    constructor(name: string, image: string) {
        this.name = name;
        this.imageFile = image;
    }

    public setName(name: string) {
        this.name = name;
    }
    public getName(): string {
        return this.name;
    }

    public setImage(image: string) {
        this.imageFile = image;
    }
    public getImage(): string {
        return this.imageFile;
    }
}
