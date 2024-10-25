export enum TransactionType {
    Deposit = 'Deposit',
    BuyCrypto = 'BuyCrypto',
    ExchangeCrypto = 'ExchangeCrypto'
}

export class Transaction {
    private type: TransactionType;
    private amount: number;
    private cryptoSymbol?: string;
    private fromCryptoSymbol?: string;
    private toCryptoSymbol?: string;
    private fiatAmount: number;
    private date: string;

    constructor(type: TransactionType, amount: number, fiatAmount: number, cryptoSymbol?: string, fromCryptoSymbol?: string, toCryptoSymbol?: string) {
        this.type = type;
        this.amount = amount;
        this.fiatAmount = fiatAmount;
        this.cryptoSymbol = cryptoSymbol;
        this.fromCryptoSymbol = fromCryptoSymbol;
        this.toCryptoSymbol = toCryptoSymbol;
        this.date = new Date().toISOString();
    }

    printTransaction() {
        let details = `[${this.date}] ${this.type} - `;
        if (this.type === TransactionType.Deposit) {
            details += `Fiat deposit of ${this.fiatAmount} USD`;
        } else if (this.type === TransactionType.BuyCrypto) {
            details += `Bought ${this.amount} ${this.cryptoSymbol} for ${this.fiatAmount} USD`;
        } else if (this.type === TransactionType.ExchangeCrypto) {
            details += `Exchanged ${this.amount} ${this.fromCryptoSymbol} to ${this.toCryptoSymbol}`;
        }
        console.log(details);
    }
}
