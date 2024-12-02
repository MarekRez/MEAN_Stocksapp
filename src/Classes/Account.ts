import { InvestmentRecord } from './InvestmentRecord';
import { Stock } from './Stock';
import {BankAccount} from "./BankAccount";

export class Account {
    private stocks: Stock[] = []; // pole akcii Stock
    private balance: number;
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

                const existingStock = this.stocks.find(s => s.name === stock.name);

                if (existingStock) {
                    existingStock.totalShares += sharesToBuy;
                } else {
                    stock.totalShares = sharesToBuy;
                    this.stocks.push(stock);
                }

                const investmentRecord = new InvestmentRecord(stock.name, sharesToBuy, stock.stockPrice, "buy");
                this.investmentHistory.push(investmentRecord);

                return { success: true, leftover };
            } else {
                return { success: false, leftover: investmentAmount }; // zbytok je cela ciastka
            }
        } else {
            console.log(`Investment failed: Insufficient funds to buy shares.`);
            return { success: false, leftover: investmentAmount }; // zbytok je cela ciastka
        }
    }

    //metoda na vybranie z akcie
    public withdrawFromStock(stock: Stock, amountToWithdraw: number): { success: boolean, message: string } {
        const sharesAvailable = stock.totalShares;

        // Vypocita pocet akcii na predaj a zostavajucu sumu
        const sharesToSell = Math.floor(amountToWithdraw / stock.stockPrice);
        const leftover = amountToWithdraw - sharesToSell * stock.stockPrice;

        if (sharesToSell <= sharesAvailable) {
            const cashReceived = sharesToSell * stock.stockPrice;
            stock.totalShares -= sharesToSell;
            this.balance += cashReceived;

            // Zaznamena transakciu do investicneho zaznamu
            const investmentRecord = new InvestmentRecord(stock.name, sharesToSell, stock.stockPrice, "sell");
            this.investmentHistory.push(investmentRecord);

            // Odstrani akciu, ak uz nemame ziadne podiely
            if (stock.totalShares === 0) {
                this.stocks = this.stocks.filter(s => s.name !== stock.name);
            }

            // Vrati spravu s informaciou o predaji a zostavajucou sumou
            return {
                success: true,
                message: `Sold ${sharesToSell} shares of ${stock.name} for ${cashReceived.toFixed(2)}. Leftover: ${leftover.toFixed(2)}. New balance: ${this.balance.toFixed(2)}`
            };
        } else {
            return {
                success: false,
                message: `Not enough shares to sell. Available shares: ${sharesAvailable}`
            };
        }
    }

    public getInvestmentHistory(): InvestmentRecord[] {
        return this.investmentHistory;
    }

    public getStocks(): Stock[] {
        return this.stocks;
    }
    public getBalance(): number {
        return this.balance;
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
            this.bankAccount.deposit(amount);
            console.log(`Withdrawn ${amount.toFixed(2)} from account. New balance: ${this.balance.toFixed(2)}`);
            return true;
        } else {
            console.log(`Withdrawal failed: Insufficient funds. Current balance: ${this.balance.toFixed(2)}`);
            return false;
        }
    }

    // public calculatePortfolioValue(): number {
    //     let totalValue = 0;
    //     this.investmentHistory.forEach(record => {
    //         totalValue += record.shares * record.price;
    //     });
    //     return totalValue;
    // }
}
