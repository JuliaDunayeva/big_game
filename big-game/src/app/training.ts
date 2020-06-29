import { min } from 'rxjs/operators';
import { HorseData } from './horse-data';

export class Training {
    private name: string;
    private done: boolean;
    private percent: number;
    private done_image: string;
    private not_done_image: string;
    
    private hour: number;
    private minute: number;

    private energy: number;
    private speed: number;
    private gallop: number;
    private trot: number;
    private stamina: number;
    private dressage: number;
    private jumping: number;

    constructor(name: string, done_image: string, not_done_image: string) {
        this.name = name;
        this.done_image = done_image;
        this.not_done_image = not_done_image;
        this.done = false;
    }

    public Train(horse: HorseData){
        switch (this.name)
        {
            case 'stamina':{
            horse.stamina = horse.stamina +this.stamina;
            break;
            }

        }
    }
    public setTime(hour: number, minute: number){
        this.hour=hour;
        this.minute=minute;
    }

    public getMinute(){
        return this.minute;
    }

    public getHour(){
        return this.hour;
    }

    public getStamina(){
        return this.stamina;
    }

    public setStamina(stamina: number){
        this.stamina = stamina;
    }

    public getSpeed(){
        return this.speed;
    }

    public setSpeed(speed: number){
        this.speed = speed;
    }

    public getGallop(){
        return this.gallop;
    }

    public setGallop(gallop: number){
        this.gallop = gallop;
    }

    public getTrot(){
        return this.trot;
    }

    public setTrot(trot: number){
        this.trot = trot;
    }

    public getJumping(){
        return this.jumping;
    }

    public setJumping(jumping: number){
        this.jumping = jumping;
    }

    public getEnergy(){
        return this.energy;
    }

    public getDressage(){
        return this.dressage;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;

    }

    public setImages(done_image: string, not_done_image: string) {
        this.done_image = done_image;
        this.not_done_image = not_done_image;
    }

    public getDoneImage(): string {
        return this.done_image;
    }

    public getNotDoneImage(): string {
        return this.not_done_image;
    }

    public isDone(): boolean {
        return this.done;
    }

    public getPercent(): number {
        return this.percent;
    }

    public setPercent(percent: number) {
        if (percent >= 100) {
            percent = 100;
            this.done = true;
        }
        if (percent < 100) this.done = false;
        this.percent = percent;
    }

}
