export class Training {
    private name:string;
    private done:boolean;
    private percent:number;
    private done_image:string;
    private not_done_image:string;

    constructor(name:string,done_image:string,not_done_image:string){
        this.name=name;
        this.done_image=done_image;
        this.not_done_image=not_done_image;
        this.done=false;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string){
        this.name=name;

    }

    public setImages(done_image: string, not_done_image: string){
        this.done_image=done_image;
        this.not_done_image=not_done_image;
    }

    public getDoneImage():string{
        return this.done_image;
    }

    public getNotDoneImage():string{
        return this.not_done_image;
    }

    public isDone():boolean{
        return this.done;
    }

    public getPercent():number{
        return this.percent;
    }

    public setPercent(percent:number){
        if (percent>=100) 
        {
            percent=100;
            this.done=true;
        }
        if(percent<100) this.done=false;
        this.percent=percent;
    }

}
