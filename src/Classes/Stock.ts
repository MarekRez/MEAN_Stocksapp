import { StockSymbol } from "../Enums/StockSymbol";

export class Stock {
    public name: StockSymbol;
    public currency: string;
    public stockPrice: number;
    private dividendYield: number; // napriklad 0.02 pre 2% rocny vynos - dividendy, teda ocakavany profit
    private volatility: number; // volatilnost akcie
    private expectedReturn: number; // o kolko je ocakavne ze klesne alebo stupne rocne cena + dividendy, teda celkove vynosy
    public totalShares: number; // kolko vlastnime jednotiek akcie

    constructor(
        name: StockSymbol,
        currency: string,
        stockPrice: number,
        dividendYield: number,
        volatility: number,
        expectedReturn: number,
        totalShares: number = 0
    )
    {
        if (!name || !currency || stockPrice <= 0 || dividendYield < 0 || volatility < 0 || expectedReturn < 0 || totalShares < 0) {
        throw new Error('Invalid input values for Stock creation');
    }
        this.name = name;
        this.currency = currency;
        this.stockPrice = stockPrice;
        this.dividendYield = dividendYield;
        this.volatility = volatility;
        this.expectedReturn = expectedReturn;
        this.totalShares = totalShares;
    }

    // gaussove nahodne cislo, ktore pouzijeme v simulacii nizsie Geometric Brownian Motion financneho modelu
    private static gaussianRandom(): number { // pouzijeme static, lebo methoda nesuvisi s konkretnou instanciou a mozeme ju rovno tu v klase zavolat
        let u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

    // simulacia toho, ako sa moze vyvijat cena akcie spravena na zaklade Geometric Brownian Motion financneho modelu - ChatGPT mi toto odporucil
    private simulatePriceChange(): void {
        const timeStep = 1 / 12; // mesacne
        const Z = Stock.gaussianRandom();
        const drift = (this.expectedReturn - (this.volatility ** 2) / 2) * timeStep;
        const diffusion = this.volatility * Math.sqrt(timeStep) * Z;
        this.stockPrice *= Math.exp(drift + diffusion);
    }

    // vypocitanie kolko budu dividendy na zaklade vlastnenych akcii a nasledne pripocitanie novych jednotiek akcii z tychto dividendov do celkovych akcii
    private reinvestDividends(): void {
        const monthlyDividend = this.totalShares * this.stockPrice * this.dividendYield / 12;
        const newShares = monthlyDividend / this.stockPrice; // ciastkove akcie z dividendov
        this.totalShares += newShares;
        console.log(`Reinvested Dividend: ${monthlyDividend.toFixed(2)} ${this.currency} -> ${newShares.toFixed(4)} new shares`);
    }

    // simulacia jedneho mesiaca casu a teda zmien v cenach akcii
    public simulateMonth(): { monthPrice: number; totalShares: number; balance: number } {
        this.simulatePriceChange(); // zmena ceny
        this.reinvestDividends(); // reinvestovane dividendy z profitu

        return {
            monthPrice: this.stockPrice,
            totalShares: this.totalShares,
            balance: this.totalShares * this.stockPrice,
        };
    }

    // vypise info o akcii
    public showInfo(): void {
        console.log(`\nFinal Stock Info for ${this.name}:`);
        console.log(`Current Price: ${this.stockPrice.toFixed(2)} ${this.currency}`);
        console.log(`Total Shares: ${this.totalShares.toFixed(4)}`);
        console.log(`Total Balance: ${(this.totalShares * this.stockPrice).toFixed(2)} ${this.currency}`);
    }
}
