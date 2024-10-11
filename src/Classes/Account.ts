import {Person} from "./Person";

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