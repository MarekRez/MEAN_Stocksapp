import { InvestmentRecord } from './InvestmentRecord';
import { Stock } from './Stock';
import {BankAccount} from "./BankAccount";

export class Account {
    private stocks: Stock[] = []; // pole akcii Stock
    public balance: number;
    private investmentHistory: InvestmentRecord[] = []; // historia akcii
    private bankAccount: BankAccount; //

    constructor(initialBalance: number, bankAccount: BankAccount) {
        this.balance = initialBalance;
        this.bankAccount = bankAccount;
    }

    // metoda na investovanie do akcie
    public investInStock(stock: Stock, investmentAmount: number): { success: boolean; leftover: number } {
        const sharesToBuy = Math.floor(investmentAmount / stock.stockPrice);
        const leftover = investmentAmount - sharesToBuy * stock.stockPrice;
        if (sharesToBuy > 0) {
            const totalInvestment = sharesToBuy * stock.stockPrice;

            if (totalInvestment <= this.balance) {
                this.balance -= totalInvestment;

                const investmentRecord = new InvestmentRecord(stock, sharesToBuy, stock.stockPrice, "buy");
                this.investmentHistory.push(investmentRecord);

                stock.totalShares += sharesToBuy;

                console.log(`Invested ${totalInvestment.toFixed(2)} (${leftover} was unused) in ${sharesToBuy} shares of ${stock.name} at ${stock.stockPrice.toFixed(2)} each. New balance: ${this.balance.toFixed(2)}`);
                return { success: true, leftover };
            } else {
                console.log(`Investment failed: Insufficient funds to buy shares. Required: ${totalInvestment.toFixed(2)}, Available: ${this.balance.toFixed(2)}`);
                return { success: false, leftover: investmentAmount }; // zbytok je cela ciastka
            }
        } else {
            console.log(`Investment failed: Insufficient funds to buy shares.`);
            return { success: false, leftover: investmentAmount }; // zbytok je cela ciastka
        }
    }

    //
    public withdrawFromStock(stock: Stock, amountToWithdraw: number): void {
        const sharesAvailable = stock.totalShares;

        const sharesToSell = Math.floor(amountToWithdraw / stock.stockPrice);
        const leftover = amountToWithdraw - sharesToSell * stock.stockPrice;

        if (sharesToSell <= sharesAvailable) {
            const cashReceived = sharesToSell * stock.stockPrice;
            stock.totalShares -= sharesToSell;
            this.balance += cashReceived;

            const investmentRecord = new InvestmentRecord(stock, sharesToSell, stock.stockPrice, "sell");
            this.investmentHistory.push(investmentRecord);

            console.log(`Sold ${sharesToSell} (${leftover} was unused) shares of ${stock.name} for ${cashReceived.toFixed(2)}. New balance: ${this.balance.toFixed(2)}`);
        } else {
            console.log(`Withdrawal failed: Not enough shares to sell. Available shares: ${sharesAvailable}`);
        }
}

    public getInvestmentHistory(): InvestmentRecord[] {
        return this.investmentHistory;
    }

    // dat peniaze do investicneho uctu
    public deposit(amount: number): void {
        if (this.bankAccount.withdraw(amount)) { // ak je dost penazi na bankovom ucte
            this.balance += amount;
            console.log(`Deposited ${amount.toFixed(2)} to investment account. New balance: ${this.balance.toFixed(2)}`);
        } else {
            console.log(`Deposit failed: Insufficient funds in bank account.`);
        }
    }

    // vytiahnut peniaze z invest. uctu
    public withdraw(amount: number): boolean {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrawn ${amount.toFixed(2)} from account. New balance: ${this.balance.toFixed(2)}`);
            return true;
        } else {
            console.log(`Withdrawal failed: Insufficient funds. Current balance: ${this.balance.toFixed(2)}`);
            return false;
        }
    }

    public calculatePortfolioValue(): number {
        let totalValue = 0;
        this.investmentHistory.forEach(record => {
            totalValue += record.shares * record.price;
        });
        return totalValue;
    }
}
