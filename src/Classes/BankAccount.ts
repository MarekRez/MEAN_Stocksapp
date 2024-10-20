import { Account } from "./Account";

export class BankAccount {
    public iban: string;
    private balance: number;

    constructor(initialBalance: number) {
        this.iban = this.generateIBAN(); // Generates a new IBAN for each object
        this.balance = initialBalance;
    }

    // Generates a random IBAN from letters and numbers
    private generateIBAN(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let iban = 'IBAN-';
        for (let i = 0; i < 16; i++) {
            iban += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return iban;
    }

    // Deposit to bank account
    public deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited ${amount.toFixed(2)} to bank account ${this.iban}. New balance: ${this.balance.toFixed(2)}`);
        } else {
            console.log(`Deposit failed: Invalid amount. Amount must be positive.`);
        }
    }

    // Withdraw from bank account
    public withdraw(amount: number): boolean {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrawn ${amount.toFixed(2)} from bank account ${this.iban}. New balance: ${this.balance.toFixed(2)}`);
            return true; // Successful withdrawal
        } else {
            console.log(`Withdrawal failed: Insufficient funds in bank account ${this.iban}. Current balance: ${this.balance.toFixed(2)}`);
            return false; // Withdrawal failed
        }
    }

    // Check the balance of the bank account
    public getBalance(): number {
        return this.balance;
    }
}
