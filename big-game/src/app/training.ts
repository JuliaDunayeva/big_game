import { min } from 'rxjs/operators';
import { HorseData } from './horse-data';
import { HorseDataService } from './services/horse-data.service';

export class Training {
    
    private name: string;
    private done: boolean=false;
    private percent: number=0;
    private done_image: string;
    private not_done_image: string;
    
    private hour: number=0;
    private minute: number=0;

    private energy: number = 0;
    private speed: number = 0;
    private gallop: number = 0;
    private trot: number = 0;
    private stamina: number = 0;
    private dressage: number = 0;
    private jumping: number = 0;

    private maxTrain=100;
    private horseDataService:  HorseDataService

    constructor(name: string, done_image: string, not_done_image: string, private HDS:  HorseDataService) {
        this.name = name;
        this.done_image = done_image;
        this.not_done_image = not_done_image;
        this.done = false;
        this.horseDataService = HDS;
    }

    public Train(horse: HorseData){
        switch (this.name)
        {
            case 'Stamina':{
            	//horse.tr_stamina += 1;
            	horse.stamina += this.stamina;
            	this.percent +=  horse.stamina / ( ( this.stamina * 10));
		if (this.percent>100){
			this.percent=100;
			this.done=true;
            	}
                break;
            }
            case 'Speed':{ 
                //horse.tr_speed += this.speed;
                horse.speed += this.speed;
                this.percent += horse.speed / ( ( this.speed) * 10 );
                if (this.percent>100){
                    this.percent=100;
                    this.done=true;
                }
                break;
            }
            case 'Dressage':{ 
                horse.dressage += this.dressage;
                
                this.percent += horse.dressage / ( ( this.dressage) * 10 );
                if (this.percent>100){
                    this.percent=100;
                    this.done=true;
                }
                break;
            }
            case 'Gallop':{
                //horse.tr_gallop += this.gallop;
                horse.gallop += this.gallop;
                this.percent += horse.gallop / ( ( this.gallop) * 10 );
                if (this.percent>100){
                    this.percent=100;
                    this.done=true;
                }
                break;
            }
            case 'Trot':{ 
                //horse.tr_trot += this.trot;
                horse.trot += this.trot;
                this.percent += horse.trot / ( ( this.trot) * 10 );
                if (this.percent>100){
                    this.percent=100;
                    this.done=true;
                }
                break;
            }
            case 'Jumping':{
                //horse.tr_jumping += this.jumping;
                horse.jumping += this.jumping;
                this.percent += horse.jumping / ( ( this.jumping) * 10 );
                if (this.percent>100){
                    this.percent=100;
                    this.done=true;
                }
                break;
            }

        }
                //horse.energy -= this.energy;
                this.horseDataService.updateHorseTime(horse.time, horse.age, this.hour, this.minute);
                //this.horseDataService.setHorseTraining(horse);
                this.horseDataService.setHorseEnergy(horse);
                this.horseDataService.setHorseStamina(horse);
                this.horseDataService.setHorseSpeed(horse);
                this.horseDataService.setHorseDressage(horse);
                //this.horseDataService.setHorseTrot(horse);
                //this.horseDataService.setHorseJumping(horse);
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

    public setEnergy(energy: number){
        this.energy = energy;
    }

    public getDressage(){
        return this.dressage;
    }

    public setDressage(dressage: number){
        this.dressage = dressage;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;

    }

    public whichStats(){
        switch (this.name) {

            case "Stamina":{
                return this.stamina;
                break;
            }
            case "Speed":{
                return this.speed;
                break;
            }
            case "Gallop":{
                return this.gallop;
                break;
            }
            case "Trot":{
                return this.trot;
                break;
            }
            case "Jumping":{
                return this.jumping;
                break;
            }
            case "Dressage":{
                return this.dressage;
                break;
            }
        }
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
        console.log(this.percent);
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
