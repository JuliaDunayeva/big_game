import { stripSummaryForJitNameSuffix } from '@angular/compiler/src/aot/util';
export class HorsePageButtons {
    public name: string;
    public enabledImage: string;
    public disabledImage: string;
    public enabled: boolean;
    public energy: number;
    public morale: number;
    public health: number;
    public hour: number;
    public minute: number;

    stamina: number;
    speed: number;
    dressage: number;
    gallop: number;
    trot:  number;
    jumping: number;

    constructor(name:string){
        this.name = name;
    }

    setStatModifiers(stamina: number, speed: number, dressage: number, gallop: number, trot: number, jumping: number){
        this.stamina = stamina;
        this.speed = speed;
        this.dressage = dressage;
        this.gallop = gallop;
        this.trot = trot;
        this.jumping = jumping;
    }

    setDefaultTime(hour : number, minute : number){
        this.hour = hour;
        this.minute = minute;
    }

      /* Toggle buttons function
        Parameters: 
            toggle -> boolean, true or false to enable or disable button
  */
    toggleButton(toggle: boolean): string{
        this.enabled = toggle;
        if (this.enabled) {
                return this.enabledImage;
        } else {
                return this.disabledImage;
        }
    }
}
