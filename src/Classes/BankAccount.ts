// models/BankAccount.ts
export class BankAccount {
    public iban: string; // Unique IBAN for the bank account
    private balance: number; // Balance in the bank account

    constructor(initialBalance: number) {
        this.iban = this.generateIBAN(); // Generate a random IBAN
        this.balance = initialBalance; // Initialize the balance
    }

    // Generate a random IBAN (dummy implementation)
    private generateIBAN(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let iban = 'IBAN-';
        for (let i = 0; i < 16; i++) {
            iban += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return iban;
    }

    // Deposit money into the bank account
    public deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited ${amount.toFixed(2)} to bank account ${this.iban}. New balance: ${this.balance.toFixed(2)}`);
        } else {
            console.log(`Deposit failed: Invalid amount. Amount must be positive.`);
        }
    }

    // Withdraw money from the bank account
    public withdraw(amount: number): boolean {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrawn ${amount.toFixed(2)} from bank account ${this.iban}. New balance: ${this.balance.toFixed(2)}`);
            return true; // Withdrawal successful
        } else {
            console.log(`Withdrawal failed: Insufficient funds in bank account ${this.iban}. Current balance: ${this.balance.toFixed(2)}`);
            return false; // Withdrawal failed
        }
    }

    // Get current balance
    public getBalance(): number {
        return this.balance;
    }
}