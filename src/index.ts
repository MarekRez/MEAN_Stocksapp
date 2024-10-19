import {Stock} from "./Classes/Stocks";
import {StockSymbol} from "./Enums/Enum-stocks";

const stock1 = new Stock(StockSymbol.AAPL, "$", 250, 2.5, 500);
console.log(stock1.getBalance())