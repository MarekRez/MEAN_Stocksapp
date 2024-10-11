export class Stock {
    public name: string;
    public currency:string;
    public stockPrice: number;
    private dividendYield:number;
    private balance:number;

    constructor(stockName:string, currency:string, stockPrice: number, dividendYield:number, balance:number) {
        this.name = stockName;
        this.currency = currency;
        this.stockPrice = stockPrice;
        this.dividendYield = dividendYield;
        this.balance = balance;
    }
    public getBalance():number{
        return this.balance;
    }
}
