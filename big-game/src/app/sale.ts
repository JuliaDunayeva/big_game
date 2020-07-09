export class Sale {
    horseId: string;
    sellerId: string;
    sellDate: Date;
    buyerId: string;
    buyDate: Date;
    sold: boolean;
    price: number;

    constructor(horseId: string, sellerId: string, sellDate: Date,
        buyerId: string, buyDate: Date, sold: boolean, price: number) {
        this.horseId = horseId;
        this.sellerId = sellerId;
        this.sellDate = sellDate;
        this.buyerId = buyerId;
        this.buyDate = buyDate;
        this.sold = sold;
        this.price = price;
    }
}
