import {Person} from './Person';

export class Client extends Person {
    private id: number;

    constructor(id: number, person: Person) {
        super(person.getFirstName(), person.getLastName());
        this.id = id;
    }

    getId() {
        return this.id;
    }
}
