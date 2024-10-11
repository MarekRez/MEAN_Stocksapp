import {Person} from './Person';
import {Transaction} from './Transaction';

export class Account {
    private owner: Person;
    private iban: string;
    private balance: number;
    private transactions: Transaction[];

    constructor(owner: Person, iban: string) {
        this.owner = owner;
        this.iban = iban;
        this.balance = 0;
        this.transactions = [];
    }

    deposit(amount: number): Transaction {
        // this.balance = this.balance + amount;
        this.balance += amount;
        const transaction = new Transaction(amount, this.iban);
        this.transactions.push(transaction);
        return transaction;
    }

    transfer(amount: number, targetAccount: Account): Transaction | undefined {
        if (this.iban === targetAccount.iban) {
            return;
        }

        if (this.balance < amount) {
            return;
        }

        this.balance -= amount;
        targetAccount.balance += amount;

        const transaction = new Transaction(amount, targetAccount.iban, this.iban);

        this.transactions.push(transaction);
        targetAccount.transactions.push(transaction);

        return transaction;
    }

    printState() {
        console.log(`Owner: ${this.owner.getName()}, IBAN: ${this.iban}, Balance: ${this.balance}`);
        console.log(this.transactions);
    }
}
