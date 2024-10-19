import { Stock } from './Stock';

// ukladame sem udaje o akciach
export class InvestmentRecord {
    public stock: Stock;
    public shares: number; // kolko sme kupili/predali
    public price: number;  // cena na ktorej sme kupili/predali
    public type: "buy" | "sell"; // typ transakcie

    constructor(stock: Stock, shares: number, price: number, type: "buy" | "sell") {
        this.stock = stock;
        this.shares = shares;
        this.price = price;
        this.type = type;
    }
}