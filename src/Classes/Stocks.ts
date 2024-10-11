class Stock {
    public stockName: string;
    private marketOpening: string;
    private marketClosing: string;
    public stockPrice: number;

    constructor(stockName:string, marketOpening: string, marketClosing: string, stockPrice: number) {
        this.stockName = stockName;
        this.marketOpening = marketOpening;
        this.marketClosing = marketClosing;
        this.stockPrice = stockPrice;
    }
    public getPrice():number{
        return this.stockPrice;
    }
}
const stock = new Stock("Apple", "Tuesday", "Friday", 250);