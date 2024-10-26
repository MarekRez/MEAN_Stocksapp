import {Person} from "./Person";
import {BankAccount} from "./BankAccount";
import {Account} from "./Account";

export class TradingCompany {
    private clients: Person[] = [];

    public addClient(newClient:Person) {
        this.clients.push(newClient);
        return newClient;
    }
    public getAllClients() {
        return this.clients;
    }

    public getClientByEmail(email: string): Person | undefined {
        return this.clients.find(client => client.getEmail() === email);
    }

    public updateClientByEmail(email: string, updatedClient: { name?: string; bankAccount?: BankAccount; investmentAccount?: Account }): Person | undefined {
        const client = this.getClientByEmail(email);

        if (client) {

            if (updatedClient.name) {
                client.setName(updatedClient.name);
            }

            if (updatedClient.bankAccount) {
                client.setBankAccount(updatedClient.bankAccount);
            }

            if (updatedClient.investmentAccount) {
                client.setInvestmentAccount(updatedClient.investmentAccount);
            }

            return client;
        }
        return undefined;
    }

    public deleteClientByEmail(email: string): boolean {
        const initialLength = this.clients.length;
        this.clients = this.clients.filter(client => client.getEmail() !== email);
        return this.clients.length < initialLength;
    }

}
