import { Account } from './Classes/Account';
import { Person } from './Classes/Person';
import { Stock } from './Classes/Stock';
import { StockSymbol } from './Enums/StockSymbol';

// Create some example stocks
const appleStock = new Stock(StockSymbol.AAPL, "USD", 150, 1000); // Example stock
const teslaStock = new Stock(StockSymbol.TSLA, "USD", 700, 1000); // Example stock

// Create a person with a bank account
const person = new Person("John Doe", 5000); // Create a person with a bank account
const myAccount = new Account(10000); // Create a stock account

// Example transactions
myAccount.investInStock(appleStock, 1500); // Invest $1500 in Apple
myAccount.withdrawFromStock(appleStock, 1); // Sell 1 share of Apple

// Deposit money from stock account to bank account
person.depositToBank(2000, myAccount); // Deposit $2000 to bank account

// Withdraw money from bank account to stock account
person.withdrawFromBank(1000, myAccount); // Withdraw $1000 from bank account to stock account

// Get investment history
const investmentHistory = myAccount.getInvestmentHistory();
console.log("Investment History:", investmentHistory);