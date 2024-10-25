import { Stock } from '../Classes/Stock';
import { Person } from '../Classes/Person';
import { Account } from '../Classes/Account';
import { BankAccount } from '../Classes/BankAccount';
import { Portfolio } from '../Classes/Portfolio';
import { StockSymbol } from '../Enums/StockSymbol';

// spravime akciu s volitelnymi parametrami (name, currency, stockPrice, dividendYield, volatility, and expectedReturn)
const apple = new Stock(StockSymbol.AAPL, "USD", 150, 0.02, 0.6, 0.2);
const google = new Stock(StockSymbol.GOOGL, "USD", 2800, 0.20, 0.7, 0.3);
const tesla = new Stock(StockSymbol.TSLA, "USD", 750, 0.15, 0.8, 0.1);

// novy bankovy ucet 1
const bankAccount1 = new BankAccount(10000);
console.log(bankAccount1.getBalance())

// novy investicny ucet 1
const InvestmentAccount1 = new Account(0, bankAccount1); // balance na zaciatku 0

// nova osoba Marek a priradenie bankoveho uctu 1 a investicneho uctu InvestmentAccount1 k Marekovi
const Marek = new Person('Marek Rezny', 'rezny.marek@gmail.com', bankAccount1, InvestmentAccount1 );

InvestmentAccount1.deposit(8000); // pridanie 6000 na investicny ucet
Marek.depositToBank(2000); // vratenie 2000 naspat na bankovy ucet
console.log(`Bank Account Balance: ${bankAccount1.getBalance()}`);
console.log(`Investment Account Balance: ${InvestmentAccount1.balance}`);

// ivestujeme do akcii
InvestmentAccount1.investInStock(apple, 1000); //
InvestmentAccount1.investInStock(google, 3000);
InvestmentAccount1.investInStock(tesla, 2000);

// balance po investovani na investicnom ucte
console.log(`\nAccount Balance after Investments: ${InvestmentAccount1.balance.toFixed(2)} USD`);

// spravime portoflio a pridame tam akcie
const MarekPortfolio = new Portfolio();
MarekPortfolio.addStock(apple);
MarekPortfolio.addStock(google);
MarekPortfolio.addStock(tesla);

// simulacia portfolia nasledujucych x mesiacov
MarekPortfolio.simulateMonths(4);

// predanie (casti) akcii
InvestmentAccount1.withdrawFromStock(apple, 500);
InvestmentAccount1.withdrawFromStock(google, 2000);

// balance invest. uctu
console.log(`\nAccount Balance after Withdrawals: ${InvestmentAccount1.balance.toFixed(2)} USD`);

// investicna historia
console.log("\nInvestment History:");
InvestmentAccount1.getInvestmentHistory().forEach(record => {
    console.log(`${record.type} - ${record.shares} shares of ${record.stock.name} at ${record.price.toFixed(2)} each.`);
});

// Ak zadáme simuláciu s parametrom false, tak vypíše konečný stav portfólia
MarekPortfolio.simulateMonths(0, false); // 0 mesiacov znamená len zobraziť konečný stav