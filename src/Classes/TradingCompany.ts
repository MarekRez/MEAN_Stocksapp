import {Person} from "./Person";

export class TradingCompany {
    private clients: Person[] = [];

    public addClient(newClient:Person) {
        this.clients.push(newClient);
        return newClient;
    }
    public getClients() {
        return this.clients;
    }

    public getClientByEmail(email: string): Person | undefined {
        return this.clients.find(client => client.email === email);
    }

    public deleteClientByEmail(email: string){
        const initialLength = this.clients.length;
        this.clients = this.clients.filter(client => client.getEmail() !== email);
        return this.clients.length < initialLength;
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
