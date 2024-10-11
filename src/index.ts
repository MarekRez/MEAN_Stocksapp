import {Person} from "./Types/Person";
import {Role} from "./Enums/Role";

const meno: Person = {
    firstName:"Marek",
    lastName:"Rezny",
    role:Role.ADMIN
};
console.log(`Hello ${meno.firstName} ${meno.lastName} ${meno.role}!`);

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