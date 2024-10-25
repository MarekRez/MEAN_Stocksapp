import {Person} from "./Person";

export class Clients extends Person{
    private clients: Person[];

    constructor(person: Person) {
        super(person.getName(), person.getEmail())
        this.clients = [];
    }

    getClients(): Person[] {
        return this.clients;
    }

    getClient(id: number): Person | undefined {
        return this.clients.find(client => client.() === id);
    }

    deleteClient(id: number) {
        this.clients = this.clients.filter(client => client.getId() !== id);
    }

    updateClient(id: number, firstName: string, lastName: string): Person | undefined {
        const client = this.getClient(id);
        if (!client) {
            return;
        }

        client.setFirstName(firstName);
        client.setLastName(lastName);

        return client;
    }
}
