export class Transaction {
    private amount: number;
    private ibanFrom?: string;
    private ibanTo: string;
    private date: string;

    constructor(amount: number, ibanTo: string, ibanFrom?: string) {
        this.amount = amount;
        this.ibanTo = ibanTo;
        this.ibanFrom = ibanFrom;
        this.date = new Date().toISOString();
    }
}
