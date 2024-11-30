export class BankAccount {
    public iban: string;
    private balance: number;

    constructor(initialBalance: number) {
        this.iban = this.generateIBAN(); // generuje sa novy IBAN pre kazdy dalsi objekt
        this.balance = initialBalance;
    }

    // IBAN na zakladem random z pismen a cislic
    private generateIBAN(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let iban = 'IBAN-';
        for (let i = 0; i < 16; i++) {
            iban += characters.charAt(Math.floor(Math.random() * characters.length)); // charAt zoberie index a priradi zo zonamu characters char, math.random vrati cislo od 0 do 1 a nasledne krat dlzka pola-stringu characters
        }
        return iban;
    }

    // deposit do bankoveho uctu
    public deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited ${amount.toFixed(2)} to bank account ${this.iban}. New balance: ${this.balance.toFixed(2)}`);
        } else {
            console.log(`Deposit failed: Invalid amount. Amount must be positive.`);
        }
    }

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

    public getBalance(): number {
        return this.balance;
    }
}
