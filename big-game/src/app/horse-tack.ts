export class HorseTack {
    horse_id: string;
    saddle_id: string;
    cost: number;
    buy_date: Date;
    constructor(horse_id: string, saddle_id: string,cost: number,
        buy_date: Date){
        this.horse_id = horse_id;
        this.saddle_id = saddle_id;
        this.cost = cost;
        this.buy_date = buy_date;
    }
}
