import { Stock } from './Stock';

export class InvestmentRecord {
    public stock: Stock; // The stock involved in the investment
    public shares: number; // Number of shares bought/sold
    public price: number;  // Price at which shares were bought/sold
    public type: "buy" | "sell"; // Type of transaction

    constructor(stock: Stock, shares: number, price: number, type: "buy" | "sell") {
        this.stock = stock;
        this.shares = shares;
        this.price = price;
        this.type = type;
    }
}