import { BankAccount } from './BankAccount';
import { Account } from './Account';

export class Person {
    private name: string;
    private email: string;
    private bankAccount: BankAccount; // Reference to the person's bank account
    private investmentAccount: Account; // Optional investment account

    constructor(name: string, email: string, bankAccount: BankAccount, investmentAccount: Account) {
        this.name = name;
        this.email = email;
        this.bankAccount = bankAccount;
        this.investmentAccount = investmentAccount;
    }

    public depositToBank(amount: number): void {
        if (amount <= this.investmentAccount.balance) { // Ensure the amount is available in the investment account
            this.investmentAccount.withdraw(amount); // Withdraw from the investment account
            this.bankAccount.deposit(amount); // Deposit to the bank account
            console.log(`Deposited ${amount.toFixed(2)} to bank account ${this.bankAccount.iban}. New bank balance: ${this.bankAccount.getBalance().toFixed(2)}`);
        } else {
            console.log(`Deposit to bank failed: Insufficient funds in investment account.`);
        }
    }

    public withdrawFromBank(amount: number): void {
        if (this.bankAccount.withdraw(amount)) { // Withdraw from the bank account
            this.investmentAccount.deposit(amount); // Deposit to the investment account
            console.log(`Withdrawn ${amount.toFixed(2)} from bank account ${this.bankAccount.iban}. New investment balance: ${this.investmentAccount.balance.toFixed(2)}`);
        } else {
            console.log(`Withdrawal failed: Insufficient funds in bank account.`);
        }
    }

}
