import { Stock } from './Stock';

export class Portfolio {
    public stocks: Stock[] = [];

    public addStock(stock: Stock): void {
        this.stocks.push(stock); // pridanie akcie do zoznamu akcii v portfoliu
    }

    // simulaciu priebehu casu a dopadok na akcie
    public simulateMonths(months: number, showInfo: boolean = true): void {
        console.log(`\n--- Portfolio Simulation for ${months} months ---\n`);

        for (let month = 1; month <= months; month++) {
            if (showInfo) {
                console.log(`Month ${month}:`);
            }

            let totalBalance = 0;

            // simulacia mesiaca na dany pocet mesiacov pre kazdu individualnu akciu a akumulacia balancu akcie
            this.stocks.forEach((stock) => { // loop forEach poznamka pre seba - an array method that iterates over each element in an array (callback f.)
                const result = stock.simulateMonth();

                const monthPrice = result.monthPrice;
                const totalShares = result.totalShares;
                const balance = result.balance;
                // const { monthPrice, totalShares, balance } = stock.simulateMonth(); - poznamka pre seba, destructuringom by sa to dalo napisat aj takto

                if (showInfo) {
                    console.log(`  ${stock.name}:`);
                    console.log(`    Stock Price: ${monthPrice.toFixed(2)} ${stock.currency}`);
                    console.log(`    Total Shares: ${totalShares.toFixed(4)}`);
                    console.log(`    Balance: ${balance.toFixed(2)} ${stock.currency}\n`);
                }

                totalBalance += balance; // vsetky akcie v portfoliu spolu - balance za dany mesiac
            });

            if (showInfo) {
                console.log(`Total Portfolio Balance: ${totalBalance.toFixed(2)}\n`);
            }
        }

        if (!showInfo) { //ak zadame parameter "false", rovno prejdeme na final balance a preskocime podrobny vypis
            this.showFinalBalance();
        }
    }

    // finalny balance za vsetky mesiace dokopy
    public showFinalBalance(): void {
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
