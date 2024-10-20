import { InvestmentRecord } from './InvestmentRecord';
import { Stock } from './Stock';
import {BankAccount} from "./BankAccount";

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

            // Check if there are sufficient funds before investing
            if (totalInvestment <= this.balance) {
                this.balance -= totalInvestment; // Deduct from balance

                // Store the investment record
                const investmentRecord = new InvestmentRecord(stock, sharesToBuy, stock.stockPrice, "buy");
                this.investmentHistory.push(investmentRecord);

                stock.totalShares += sharesToBuy; // Update total shares in the stock

                console.log(`Invested ${totalInvestment.toFixed(2)} in ${sharesToBuy} shares of ${stock.name} at ${stock.stockPrice.toFixed(2)} each. New balance: ${this.balance.toFixed(2)}`);
            } else {
                console.log(`Investment failed: Insufficient funds to buy shares. Required: ${totalInvestment.toFixed(2)}, Available: ${this.balance.toFixed(2)}`);
            }
        } else {
            console.log(`Investment failed: Insufficient funds to buy shares.`);
        }
    }

    // Withdraw an amount of money from the account by selling shares of a specific stock
    public withdrawFromStock(stock: Stock, amountToWithdraw: number): void {
        const sharesAvailable = stock.totalShares;

        // Calculate how many shares are needed to sell to get the desired amount
        const sharesToSell = Math.floor(amountToWithdraw / stock.stockPrice);

        // Check if enough shares are available for the withdrawal
        if (sharesToSell <= sharesAvailable) {
            const cashReceived = sharesToSell * stock.stockPrice; // Calculate cash received from selling shares
            stock.totalShares -= sharesToSell; // Update total shares in the stock
            this.balance += cashReceived; // Update account balance

            // Store the investment record for selling
            const investmentRecord = new InvestmentRecord(stock, sharesToSell, stock.stockPrice, "sell");
            this.investmentHistory.push(investmentRecord);

            console.log(`Sold ${sharesToSell} shares of ${stock.name} for ${cashReceived.toFixed(2)}. New balance: ${this.balance.toFixed(2)}`);
        } else {
            console.log(`Withdrawal failed: Not enough shares to sell. Available shares: ${sharesAvailable}`);
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

    public calculatePortfolioValue(): number {
        let totalValue = 0;
        this.investmentHistory.forEach(record => {
            totalValue += record.shares * record.price; // Current value of stocks based on transaction records
        });
        return totalValue;
    }
}
