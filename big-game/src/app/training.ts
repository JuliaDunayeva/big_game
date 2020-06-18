export class Training {
    public name:string;
    public done:boolean;
    public percent:number;
    public done_image:string;
    public not_done_image:string;

    constructor(name:string,done_image:string,not_done_image:string){
        this.name=name;
        this.done_image=done_image;
        this.not_done_image=not_done_image;
        this.done=false;
    }

    public setPercent(percent:number){
        if (percent>100) 
        {
            percent=100;
            this.done=true;
        }
        this.percent=percent;
    }

}
