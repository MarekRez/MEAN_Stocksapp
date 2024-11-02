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

    public getName() {
        return this.name;
    }
    public setName(newName: string) {
        this.name = newName;
    }

    public getEmail() {
        return this.email;
    }

    public getBankAccount(): BankAccount {
        return this.bankAccount;
    }

    public setBankAccount(newBankAccount: BankAccount) {
        this.bankAccount = newBankAccount;
    }

    public getInvestmentAccount(): Account {
        return this.investmentAccount;
    }
    public setInvestmentAccount(newInvestmentAccount: Account) {
        this.investmentAccount = newInvestmentAccount;
    }

    // poslanie penazi z investicneho uctu na bankovy ucet
    public depositToBank(amount: number): void {
        if (amount <= this.investmentAccount.getBalance()) {
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
            console.log(`Withdrawn ${amount.toFixed(2)} from bank account ${this.bankAccount.iban}. New investment balance: ${this.investmentAccount.getBalance().toFixed(2)}`);
        } else {
            console.log(`Withdrawal failed: Insufficient funds in bank account.`);
        }
    }
}
