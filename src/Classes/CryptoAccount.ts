import { CryptoEnum } from '../Classes/CryptoEnum';
import { Crypto } from '../Classes/Crypto';
import { Transaction, TransactionType } from '../Classes/Transaction';

export class CryptoAccount {
    private address: string;
    private fiatBalance: number;
    private cryptoBalances: Map<CryptoEnum, number>;
    private transactions: Transaction[];

    constructor() {
        this.address = this.generateWalletAddress();
        this.fiatBalance = 0;
        this.cryptoBalances = new Map();
        this.transactions = [];
    }

    private generateWalletAddress(): string {
        const characters = '0123456789abcdef';
        let walletAddress = '0x';
        for (let i = 0; i < 40; i++) {
            walletAddress += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return walletAddress;
    }

    depositFiat(amount: number): void {
        this.fiatBalance += amount;
        console.log(`Deposited ${amount} USD. New fiat balance: ${this.fiatBalance} USD.`);
        this.transactions.push(new Transaction(TransactionType.Deposit, 0, amount));
    }

    buyCrypto(crypto: Crypto, amount: number): void {
        const totalCost = crypto.getPriceUSD() * amount;

        if (this.fiatBalance < totalCost) {
            console.log(`Insufficient funds! You need ${totalCost} USD to buy ${amount} ${crypto.getSymbol()}, but you only have ${this.fiatBalance} USD.`);
            return;
        }

        this.fiatBalance -= totalCost;
        const currentCryptoBalance = this.cryptoBalances.get(crypto.getSymbol()) || 0;
        this.cryptoBalances.set(crypto.getSymbol(), currentCryptoBalance + amount);

        console.log(`Bought ${amount} ${crypto.getSymbol()} for ${totalCost} USD.`);
        console.log(`New fiat balance: ${this.fiatBalance} USD.`);

        this.transactions.push(new Transaction(TransactionType.BuyCrypto, amount, totalCost, crypto.getSymbol()));
    }

    exchangeCrypto(fromCrypto: Crypto, toCrypto: Crypto, amount: number): void {
        const fromBalance = this.cryptoBalances.get(fromCrypto.getSymbol()) || 0;

        if (fromBalance < amount) {
            console.log(`Insufficient ${fromCrypto.getSymbol()} balance to exchange! You have ${fromBalance}, but need ${amount}.`);
            return;
        }

        const fromValueInFiat = amount * fromCrypto.getPriceUSD();
        const toPriceInFiat = toCrypto.getPriceUSD();
        const toAmount = fromValueInFiat / toPriceInFiat;

        this.cryptoBalances.set(fromCrypto.getSymbol(), fromBalance - amount);
        const currentToBalance = this.cryptoBalances.get(toCrypto.getSymbol()) || 0;
        this.cryptoBalances.set(toCrypto.getSymbol(), currentToBalance + toAmount);

        console.log(`Exchanged ${amount} ${fromCrypto.getSymbol()} for ${toAmount} ${toCrypto.getSymbol()}.`);

        this.transactions.push(new Transaction(TransactionType.ExchangeCrypto, amount, fromValueInFiat, undefined, fromCrypto.getSymbol(), toCrypto.getSymbol()));
    }

    getFiatBalance(): number {
        return this.fiatBalance;
    }

    getCryptoBalance(crypto: CryptoEnum): number {
        return this.cryptoBalances.get(crypto) || 0;
    }

    printBalances(): void {
        console.log(`Wallet Address: ${this.address}`);
        console.log(`Fiat Balance: ${this.fiatBalance} USD`);
        console.log(`Crypto Balances:`);
        for (const [crypto, balance] of this.cryptoBalances.entries()) {
            const cryptoPrice = new Crypto(crypto).getPriceUSD();
            const fiatEquivalent = balance * cryptoPrice;
            console.log(`${crypto}: ${balance} (Value in USD: ${fiatEquivalent.toFixed(2)} USD)`);
        }
    }

    printTransactionHistory(): void {
        console.log(`Transaction History:`);
        if (this.transactions.length === 0) {
            console.log("No transactions yet.");
        } else {
            this.transactions.forEach(transaction => transaction.printTransaction());
        }
    }
}
