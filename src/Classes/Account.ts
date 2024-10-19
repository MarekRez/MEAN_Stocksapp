import { InvestmentRecord } from './InvestmentRecord';
import { Stock } from './Stock';

export class Account {
    private stocks: Stock[] = []; // Array of stocks in the account
    public balance: number;        // Account balance
    private investmentHistory: InvestmentRecord[] = []; // Track investment transactions

    constructor(initialBalance: number) {
        this.balance = initialBalance; // Initialize account balance
    }

    // Invest in a stock with a specified amount of money
    public investInStock(stock: Stock, investmentAmount: number): void {
        const sharesToBuy = Math.floor(investmentAmount / stock.stockPrice);
        if (sharesToBuy > 0) {
            const totalInvestment = sharesToBuy * stock.stockPrice;
            this.balance -= totalInvestment; // Deduct from balance

            // Store the investment record
            const investmentRecord = new InvestmentRecord(stock, sharesToBuy, stock.stockPrice, "buy");
            this.investmentHistory.push(investmentRecord);

            console.log(`Invested ${totalInvestment.toFixed(2)} in ${sharesToBuy} shares of ${stock.name} at ${stock.stockPrice.toFixed(2)} each. New balance: ${this.balance.toFixed(2)}`);
        } else {
            console.log(`Investment failed: Insufficient funds to buy shares.`);
        }
    }

    // Withdraw shares from a specific stock
    public withdrawFromStock(stock: Stock, sharesToSell: number): void {
        const sharesAvailable = stock.totalShares;
        if (sharesToSell <= sharesAvailable) {
            const cashReceived = sharesToSell * stock.stockPrice; // Calculate cash received from selling shares
            stock.totalShares -= sharesToSell; // Update total shares in the stock
            this.balance += cashReceived; // Update account balance

            // Store the investment record for selling
            const investmentRecord = new InvestmentRecord(stock, sharesToSell, stock.stockPrice, "sell");
            this.investmentHistory.push(investmentRecord);

            console.log(`Sold ${sharesToSell.toFixed(4)} shares of ${stock.name} at ${stock.stockPrice.toFixed(2)} each. Received ${cashReceived.toFixed(2)}. New balance: ${this.balance.toFixed(2)}`);
        } else {
            console.log(`Withdrawal failed: Not enough shares to sell. Available shares: ${sharesAvailable.toFixed(4)}`);
        }
    }

    // Get investment history
    public getInvestmentHistory(): InvestmentRecord[] {
        return this.investmentHistory;
    }

    // Deposit a specified amount into the account
    public deposit(amount: number): void {
        this.balance += amount;
        console.log(`Deposited ${amount.toFixed(2)} to account. New balance: ${this.balance.toFixed(2)}`);
    }

    // Withdraw a specified amount from the account
    public withdraw(amount: number): boolean {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrawn ${amount.toFixed(2)} from account. New balance: ${this.balance.toFixed(2)}`);
            return true; // Withdrawal successful
        } else {
            console.log(`Withdrawal failed: Insufficient funds. Current balance: ${this.balance.toFixed(2)}`);
            return false; // Withdrawal failed
        }
    }
}