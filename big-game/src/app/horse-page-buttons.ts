export class HorsePageButtons {
    public name:string;
    public enabledImage:string;
    public disabledImage:string;
    public enabled:boolean;
    public energy:number;
    public morale:number;
    public health:number;
    public hour:number;
    public minute:number;

    constructor(name:string){
        this.name=name;
    }
}
