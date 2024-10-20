import { Stock } from '../Classes/Stock';
import { Account } from '../Classes/Account';
import { Portfolio } from '../Classes/Portfolio';
import { StockSymbol } from '../Enums/StockSymbol';

// vytvorime akcie s volitel. parametrami (name, currency, stockPrice, dividendYield, volatility a expectedReturn)
const apple = new Stock(StockSymbol.AAPL, "USD", 150, 0.02, 0.2, 0.8);
const google = new Stock(StockSymbol.GOOGL, "USD", 2800, 0.01, 0.3, 0.6);
const tesla = new Stock(StockSymbol.TSLA, "USD", 750, 0.015, 0.4, 0.7);

// spravime ucet s 10 000 USD
const account = new Account(10000);

// investujeme do akcii
account.investInStock(apple, 3000);
account.investInStock(google, 5000);
account.investInStock(tesla, 2000);

// balance po investovani
console.log(`\nAccount Balance after Investments: ${account.balance.toFixed(2)} USD`);

// spravime portfolio, do ktoreho dane akcie pridame
const portfolio = new Portfolio();
portfolio.addStock(apple);
portfolio.addStock(google);
portfolio.addStock(tesla);

// simulacia toho, co sa bude diat s portfoliom v priebehu casu x mesiacov
portfolio.simulateMonths(4);

// predame akcie
account.withdrawFromStock(apple, 5);
account.withdrawFromStock(google, 2);

// balance po predani
console.log(`\nAccount Balance after Withdrawals: ${account.balance.toFixed(2)} USD`);

// historia predavania a kupovania akcii
console.log("\nInvestment History:");
account.getInvestmentHistory().forEach(record => {
    console.log(`${record.type} - ${record.shares} shares of ${record.stock.name} at ${record.price.toFixed(2)} each.`);
});

// ak zadame, ze chceme simulaciu s parametrom false, tak vypise finalny stav balancu portfolia
portfolio.simulateMonths(0, false); // preto zadame 0 mesiacov