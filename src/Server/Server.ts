import express, {Request, Response} from "express";
import {BankAccount} from "../Classes/BankAccount";
import {Account} from "../Classes/Account";
import {Person} from "../Classes/Person";
import {Stock} from "../Classes/Stock";
import {StockSymbol} from "../Enums/StockSymbol";
import {TradingCompany} from "../Classes/TradingCompany";
import {Portfolio} from "../Classes/Portfolio";
import cors from "cors";
import {StockData} from "../client/src/app/types/stockdata-type";

const app = express();
const port = 3000;
const API = '/api';

app.use(cors());

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send("Hello, this is Marek's website 🚀!");
});

// ----------------------------------------------------------------------

const clients = new TradingCompany()

// GET - dones zoznam klientov
app.get(`${API}/clients`, (req: Request, res: Response) => {
    const allClients = clients.getAllClients().map(client => ({
        name: client.getName(),
        email: client.getEmail(),
        iban: client.getBankAccount().iban,
        bankAccountBalance: client.getBankAccount().getBalance(),
        investmentAccountBalance: client.getInvestmentAccount().getBalance(),
    }));
    res.json(allClients);
});

// POST - vytvor noveho clienta
app.post(`${API}/clients`, (req: Request, res: Response) => {
    if (req.body.name === undefined || req.body.email === undefined) {
        res.status(409);
        res.json({ error: 'Missing required fields' });
        return;
    }

    const existingClient = clients.getClientByEmail(req.body.email);
    if (existingClient) {
        res.status(409).json({ error: 'Email already exists' });
        return;
    }

    const bankAccount = new BankAccount(req.body.bankAccountBalance || 0);
    const investmentAccount = new Account(req.body.investmentAccountBalance || 0, bankAccount);
    const person = new Person(req.body.name, req.body.email, bankAccount, investmentAccount );

    const client = clients.addClient(person);

    res.json({
        name: client.getName(),
        email: client.getEmail(),
        bankAccountBalance: bankAccount.getBalance(),
        investmentAccountBalance: investmentAccount.getBalance()
    });
});

// GET - dones konkretneho klienta na zaklade emailu
app.get(`${API}/clients/:email`, (req: Request, res: Response) => {
    const email = String(req.params.email);
    if (!String(email)) {
        res.status(409);
        res.json({ error: 'Invalid email' });
        return;
    }

    const client = clients.getClientByEmail(email);

    if (!client) {
        res.status(404);
        res.json({ error: 'Client not found' });
        return;
    }

    res.json({
        name: client.getName(),
        email: client.getEmail(),
        bankAccountBalance: client.getBankAccount().getBalance(),
        investmentAccountBalance: client.getInvestmentAccount().getBalance(),
    });
});

// DELETE - vymaz klienta na zaklade emailu
app.delete(`${API}/clients/:email`, (req: Request, res: Response) => {
    const email = String(req.params.email);
    if (!String(email)) {
        res.status(409);
        res.json({ error: 'Invalid email' });
        return;
    }

    const client = clients.getClientByEmail(email);

    if (!client) {
        res.status(404);
        res.json({ error: 'Client not found' });
        return;
    }

    clients.deleteClientByEmail(email);

    res.json({ message:"Client GONE" });
});

// PUT - UPDATE klienta podla emailu
app.put(`${API}/clients/:email`, (req: Request, res: Response) => {
    const email = String(req.params.email);

    const updatedName = req.body.name;
    const updatedBankAccountBalance = req.body.bankAccountBalance;
    const updatedInvestmentAccountBalance = req.body.investmentAccountBalance;

    if (!String(email)) {
        res.status(409);
        res.json({ error: 'Invalid email' });
        return;
    }

    const updatedFields: { name?: string; bankAccount?: BankAccount; investmentAccount?: Account } = {};

    if (updatedName) updatedFields.name = updatedName;
    if (updatedBankAccountBalance !== undefined) updatedFields.bankAccount = new BankAccount(updatedBankAccountBalance);
    if (updatedInvestmentAccountBalance !== undefined) {
        updatedFields.investmentAccount = new Account(updatedInvestmentAccountBalance, new BankAccount(updatedBankAccountBalance));
    }

    const client = clients.updateClientByEmail(email, updatedFields);

    if (!client) {
        res.status(404);
        res.json({ error: 'Client not found' });
        return;
    }

    res.json({
        name: client.getName(),
        email: client.getEmail(),
        bankAccountBalance: client.getBankAccount().getBalance(),
        investmentAccountBalance: client.getInvestmentAccount().getBalance(),
    });
});

// POST - investovanie do akcie
app.post(`${API}/clients/:email/invest`, (req: Request, res: Response) => {
    const email = req.params.email;
    const { stockSymbol, currency, stockPrice, dividendYield, volatility, expectedReturn, amount } = req.body;

    // validacia inputu
    if (!stockSymbol || typeof amount !== 'number' || amount <= 0) {
        res.status(409);
        res.json({ error: 'Invalid stock symbol or amount' });
        return;
    }

    const client = clients.getClientByEmail(email);
    if (!client) {
        res.status(404);
        res.json({ error: 'Client not found' });
        return;
    }

    // vytvorime danu akciu
    const stock = new Stock(stockSymbol as StockSymbol, currency, stockPrice, dividendYield, volatility, expectedReturn);
    if (!stock) {
        res.status(404);
        res.json({ error: 'Stock not found' });
        return;
    }

    // pristupenie cez Person k Account a investovanie a nalsedne vratenie hodnoty true or false
    const { success, leftover } = client.getInvestmentAccount().investInStock(stock, amount);

    if (success) {
        res.json({
            message: `Invested ${amount - leftover} (${leftover} was unused) in shares of ${stockSymbol}`,
            balance: client.getInvestmentAccount().getBalance(),
            leftover: leftover.toFixed(2),
            stock: {
                symbol: stockSymbol,
                shares: stock.totalShares,
                stockPrice: stock.stockPrice,
            },
        });
    } else {
        res.status(400).json({
            error: 'Investment failed: Insufficient balance or unable to buy shares',
            leftover: client.getInvestmentAccount().getBalance().toFixed(2),
        });
    }
});

// POST - vytiahnutie penazi z akcie
app.post(`${API}/clients/:email/sell`, (req: Request, res: Response): void => {
    const email: string = req.params.email;
    const { stockSymbol, sharesToSell } = req.body;

    if (!stockSymbol || typeof sharesToSell !== 'number' || sharesToSell <= 0) {
        res.status(400).json({ error: 'Invalid input: Provide stockSymbol and positive number of sharesToSell' });
        return;
    }

    const client = clients.getClientByEmail(email);
    if (!client) {
        res.status(404).json({ error: 'Client not found' });
        return;
    }

    const investmentAccount = client.getInvestmentAccount();
    if (!investmentAccount) {
        res.status(400).json({ error: 'Investment account not found for client' });
        return;
    }

    // najdeme akciu v portfoliu
    const investedStock = investmentAccount.getStocks().find(s => s.name === stockSymbol);

    if (!investedStock) {
        res.status(404).json({ error: `Stock ${stockSymbol} not found in portfolio` });
        return;
    }

    const amountToWithdraw = sharesToSell * investedStock.stockPrice;

    // pokusime sa vybrat peniaze z akcie
    const result = investmentAccount.withdrawFromStock(investedStock, amountToWithdraw);
    if (!result.success) {
        res.status(400).json({ error: result.message });
        return;
    }

    // odosleme spravu o uspesnom predaji
    res.json({
        message: `Sold ${sharesToSell} shares of ${stockSymbol}`,
        balance: investmentAccount.getBalance().toFixed(2),
        stock: {
            symbol: stockSymbol,
            remainingShares: investedStock.totalShares,
            stockPrice: investedStock.stockPrice
        }
    });
});

// POST - simulovanie portfolia s akciami pocas mesiacov
app.post(`${API}/portfolio`, (req: Request, res: Response): void => {
    const { stocks, months, showInfo } = req.body;

    // kontrola vstupov
    if (!Array.isArray(stocks) || typeof months !== 'number' || months <= 0) {
        res.status(400).json({ error: 'Invalid input: stocks should be an array and months should be a positive number' });
        return;
    }
    const portfolio = new Portfolio();

    // pridanie akcii do portfolia
    stocks.forEach((stockData: StockData) => {
        const stock = new Stock(
            stockData.stockSymbol,
            stockData.currency,
            stockData.stockPrice,
            stockData.dividendYield,
            stockData.volatility,
            stockData.expectedReturn,
            stockData.totalShares
        );

        portfolio.addStock(stock);
    });

    // nastavenie konzolovych vypisov do pola simulationResults
    let simulationResults: any[] = [];
    console.log(portfolio);

    const originalConsoleLog = console.log;

    console.log = (output) => {
        simulationResults.push(output);
        originalConsoleLog(output);
    };

    portfolio.simulateMonths(months, showInfo);

    if (!showInfo) { // ak nechceme cely vypis
        simulationResults = []; // zmazanie logov novym prazdnym polom
    }

    portfolio.showFinalBalance();

    res.json({
        message: `Simulated portfolio over ${months} months`,
        details: simulationResults,
    });
});

// GET - zoznam akcii klientov
app.get(`${API}/client/stocks`, (req: Request, res: Response) => {

    const allClients = clients.getAllClients();
    const stocksData = allClients.map(client => {
        return client.getInvestmentAccount().getStocks().map(stock => ({
            email: client.getEmail(),
            stockSymbol: stock.name,
            shares: stock.totalShares,
        }));
    });

    // danie vnorených polí do jedného poľa
    const flattenedData = stocksData.flat();

    if (flattenedData.length === 0) {
        res.json([]); // vrati prazdne pole ak nie su ziadne akcie
        return
    }

    res.json(flattenedData);
});

// POST - deposit penazi na bankový účet
app.post(`${API}/clients/:iban/bank/deposit`, (req: Request, res: Response) => {
    const iban = req.params.iban;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        res.status(400).json({ error: 'Invalid deposit amount' });
        return;
    }

    const client = clients.getAllClients().find(client => client.getBankAccount().iban === iban);
    if (!client) {
        res.status(404).json({ error: 'Client not found' });
        return;
    }

    client.getBankAccount().deposit(amount);
    res.json({
        message: `Deposited ${amount.toFixed(2)} successfully`,
        bankAccountBalance: client.getBankAccount().getBalance(),
    });
});

// POST - vytiahnutie penazi z bankového účtu
app.post(`${API}/clients/:iban/bank/withdraw`, (req: Request, res: Response) => {
    const iban = req.params.iban;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        res.status(400).json({ error: 'Invalid withdrawal amount' });
        return;
    }

    const client = clients.getAllClients().find(client => client.getBankAccount().iban === iban);
    if (!client) {
        res.status(404).json({ error: 'Client not found' });
        return;
    }

    const success = client.getBankAccount().withdraw(amount);
    if (success) {
        res.json({
            message: `Withdrawn ${amount.toFixed(2)} successfully`,
            bankAccountBalance: client.getBankAccount().getBalance(),
        });
    } else {
        res.status(400).json({
            error: 'Insufficient funds',
            bankAccountBalance: client.getBankAccount().getBalance(),
        });
    }
});

// POST - deposit penazi na investičný účet
app.post(`${API}/clients/:iban/investment/deposit`, (req: Request, res: Response) => {
    const iban = req.params.iban;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        res.status(400).json({ error: 'Invalid deposit amount' });
        return;
    }

    const client = clients.getAllClients().find(client => client.getBankAccount().iban === iban);
    if (!client) {
        res.status(404).json({ error: 'Client not found' });
        return;
    }

    client.getInvestmentAccount().deposit(amount);
    res.json({
        message: `Deposited ${amount.toFixed(2)} successfully to investment account`,
        investmentAccountBalance: client.getInvestmentAccount().getBalance(),
    });
});

// POST - vytiahnutie penazi z investičného účtu
app.post(`${API}/clients/:iban/investment/withdraw`, (req: Request, res: Response) => {
    const iban = req.params.iban;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        res.status(400).json({ error: 'Invalid withdrawal amount' });
        return;
    }

    const client = clients.getAllClients().find(client => client.getBankAccount().iban === iban);
    if (!client) {
        res.status(404).json({ error: 'Client not found' });
        return;
    }

    const success = client.getInvestmentAccount().withdraw(amount);
    if (success) {
        res.json({
            message: `Withdrawn ${amount.toFixed(2)} successfully from investment account`,
            investmentAccountBalance: client.getInvestmentAccount().getBalance(),
        });
    } else {
        res.status(400).json({
            error: 'Insufficient funds',
            investmentAccountBalance: client.getInvestmentAccount().getBalance(),
        });
    }
});

app.listen(port, () => {
    console.log(`Server is WORKING at http://localhost:${port}/`);
});