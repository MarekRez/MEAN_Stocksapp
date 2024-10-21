import { BankAccount } from './BankAccount';
import { Account } from './Account';

export class Person {
    private name: string;
    private email: string;
    private bankAccount: BankAccount; // bankovy ucet
    private investmentAccount: Account; // investicny ucet

    constructor(name: string, email: string, bankAccount: BankAccount, investmentAccount: Account) {
        this.name = name;
        this.email = email;
        this.bankAccount = bankAccount;
        this.investmentAccount = investmentAccount;
    }

    // poslanie penazi z investicneho uctu na bankovy ucet
    public depositToBank(amount: number): void {
        if (amount <= this.investmentAccount.balance) {
            this.investmentAccount.withdraw(amount); // volame metodu withdraw z Account
            this.bankAccount.deposit(amount); // metoda deposit z bankAccount
            console.log(`Deposited ${amount.toFixed(2)} to bank account ${this.bankAccount.iban}. New bank balance: ${this.bankAccount.getBalance().toFixed(2)}`);
        } else {
            console.log(`Deposit to bank failed: Insufficient funds in investment account.`);
        }
    }


    public withdrawFromBank(amount: number): void {
        if (this.bankAccount.withdraw(amount)) {
            this.investmentAccount.deposit(amount);
            console.log(`Withdrawn ${amount.toFixed(2)} from bank account ${this.bankAccount.iban}. New investment balance: ${this.investmentAccount.balance.toFixed(2)}`);
        } else {
            console.log(`Withdrawal failed: Insufficient funds in bank account.`);
        }
    }
}
