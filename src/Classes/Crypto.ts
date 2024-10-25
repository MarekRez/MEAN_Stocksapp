import { CryptoEnum } from './CryptoEnum';

export class Crypto {
    private symbol: CryptoEnum;
    private priceUSD: number;

    constructor(symbol: CryptoEnum) {
        this.symbol = symbol;
        this.priceUSD = this.setInitialPrice();  // Set the initial price
    }

    // Set initial prices for each cryptocurrency
    private setInitialPrice(): number {
        switch (this.symbol) {
            case CryptoEnum.Bitcoin:
                return 30000;  // Example initial price in USD
            case CryptoEnum.Ethereum:
                return 2000;
            case CryptoEnum.Dogecoin:
                return 0.06;
            case CryptoEnum.Litecoin:
                return 150;
            case CryptoEnum.Cardano:
                return 0.35;
            case CryptoEnum.Ripple:
                return 0.5;
            case CryptoEnum.Polkadot:
                return 4.5;
            case CryptoEnum.Chainlink:
                return 6;
            case CryptoEnum.BinanceCoin:
                return 250;
            case CryptoEnum.Solana:
                return 20;
            default:
                return 1;  // Default price
        }
    }

    // Slightly adjust the price by a random percentage between -2% and +2%
    private adjustPrice(): void {
        const randomPercentage = (Math.random() * 4 - 2) / 100;  // Random value between -0.02 and +0.02
        this.priceUSD += this.priceUSD * randomPercentage;
    }

    // Get the current price in USD (with fluctuation)
    getPriceUSD(): number {
        this.adjustPrice();  // Adjust the price each time it's called
        return this.priceUSD;
    }

    // Get the symbol of the cryptocurrency
    getSymbol(): CryptoEnum {
        return this.symbol;
    }
}
