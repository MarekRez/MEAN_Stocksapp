import {StockSymbol} from "../Enums/Enum-stocks";

export class Stock {
    public name: StockSymbol;
    public currency:string;
    public stockPrice: number;
    private dividendYield:number;
    private balance:number;

    constructor(name:StockSymbol, currency:string, stockPrice: number, dividendYield:number, balance:number) {
        this.name = name;
        this.currency = currency;
        this.stockPrice = stockPrice;
        this.dividendYield = dividendYield;
        this.balance = balance;
    }
    public getBalance():number{
        return this.balance;
    }
}
