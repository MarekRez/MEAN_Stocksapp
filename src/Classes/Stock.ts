import {StockSymbol} from "../Enums/StockSymbol";


export class Stock {
    public name: StockSymbol;
    public currency: string;
    public stockPrice: number;
    public totalShares: number; // Track the number of shares available

    constructor(name: StockSymbol, currency: string, stockPrice: number, totalShares: number) {
        this.name = name;
        this.currency = currency;
        this.stockPrice = stockPrice;
        this.totalShares = totalShares;
    }
}