// models/Person.ts
import { BankAccount } from './BankAccount';
import { Account } from './Account';

export class Person {
    public name: string;
    public bankAccount: BankAccount;

    constructor(name: string, initialBankBalance: number) {
        this.name = name;
        this.bankAccount = new BankAccount(initialBankBalance); // Initialize bank account
    }

    // Deposit money to the bank account from the stock account
    public depositToBank(amount: number, account: Account): void {
        if (amount <= account.balance) {
            account.withdraw(amount); // Withdraw from the stock account
            this.bankAccount.deposit(amount); // Deposit to the bank account
        } else {
            console.log(`Deposit to bank failed: Insufficient funds in stock account.`);
        }
    }

    // Withdraw money from the bank account to the stock account
    public withdrawFromBank(amount: number, account: Account): void {
        if (this.bankAccount.withdraw(amount)) { // Withdraw from the bank account
            account.deposit(amount); // Deposit to the stock account
        }
    }
}
