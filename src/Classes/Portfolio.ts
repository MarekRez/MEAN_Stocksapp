// models/Portfolio.ts
import { Stock } from './Stock';

export class Portfolio {
    private stocks: Stock[] = []; // Array of stocks in the portfolio

    // Add a stock to the portfolio
    public addStock(stock: Stock): void {
        this.stocks.push(stock);
    }

    // Simulate all stocks for a given number of months
    public simulateMonths(months: number, showInfo: boolean = true): void {
        console.log(`\n--- Portfolio Simulation for ${months} months ---\n`);

        for (let month = 1; month <= months; month++) {
            if (showInfo) {
                console.log(`Month ${month}:`);
            }

            let totalBalance = 0;

            // Simulate each stock and accumulate the total balance
            this.stocks.forEach((stock) => {
                const { monthPrice, totalShares, balance } = stock.simulateMonth();

                if (showInfo) {
                    console.log(`  ${stock.name}:`);
                    console.log(`    Stock Price: ${monthPrice.toFixed(2)} ${stock.currency}`);
                    console.log(`    Total Shares: ${totalShares.toFixed(4)}`);
                    console.log(`    Balance: ${balance.toFixed(2)} ${stock.currency}\n`);
                }

                totalBalance += balance;
            });

            if (showInfo) {
                console.log(`Total Portfolio Balance: ${totalBalance.toFixed(2)}\n`);
            }
        }

        if (!showInfo) {
            this.showFinalBalance();
        }
    }

    // Show final balance for the portfolio
    private showFinalBalance(): void {
        console.log(`\n--- Final Portfolio Summary ---`);

        let totalBalance = 0;

        this.stocks.forEach((stock) => {
            const stockBalance = stock.totalShares * stock.stockPrice;
            totalBalance += stockBalance;
            console.log(`${stock.name}:`);
            console.log(`  Current Price: ${stock.stockPrice.toFixed(2)} ${stock.currency}`);
            console.log(`  Total Shares: ${stock.totalShares.toFixed(4)}`);
            console.log(`  Balance: ${stockBalance.toFixed(2)} ${stock.currency}`);
        });

        console.log(`\nTotal Portfolio Balance: ${totalBalance.toFixed(2)}\n`);
    }
}
