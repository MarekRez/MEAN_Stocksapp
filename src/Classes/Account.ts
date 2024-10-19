import {Person} from "./Person";

export class Account {
    private owner: Person;
    private balance: number;

    constructor(owner: Person) {
        this.owner = owner;
        this.balance = 0;
    }
}