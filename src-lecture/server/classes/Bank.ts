import {Client} from './Client';
import {Person} from './Person';

export class Bank {
    private nextId: number;
    private clients: Client[];

    constructor() {
        this.nextId = 1;
        this.clients = [];
    }

    getClients(): Client[] {
        return this.clients;
    }

    addClient(person: Person): number {
        const client = new Client(this.nextId, person);
        this.nextId++;
        this.clients.push(client);
        return client.getId();
    }

    getClient(id: number): Client | undefined {
        return this.clients.find(client => client.getId() === id);
    }

    deleteClient(id: number) {
        this.clients = this.clients.filter(client => client.getId() !== id);
    }

    updateClient(id: number, firstName: string, lastName: string): Client | undefined {
        const client = this.getClient(id);
        if (!client) {
            return;
        }

        client.setFirstName(firstName);
        client.setLastName(lastName);

        return client;
    }
}
