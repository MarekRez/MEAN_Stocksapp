import express, {Request, Response} from "express";
import {BankAccount} from "../Classes/BankAccount";
import {Account} from "../Classes/Account";
import {Person} from "../Classes/Person";
import {Stock} from "../Classes/Stock";
import {StockSymbol} from "../Enums/StockSymbol";
import {TradingCompany} from "../Classes/TradingCompany";

const app = express();
const port = 3000;
const API = '/api';

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send("Hello, this is Marek's website 🚀!");
});

// ----------------------------------------------------------------------

const clients = new TradingCompany()
const apple = new Stock(StockSymbol.AAPL, "USD", 150, 0.02, 0.6, 0.2);

// GET - dones zoznam klientov
app.get(`${API}/clients`, (req: Request, res: Response) => {
    res.json(clients.getAllClients());
});

// POST - vytvor noveho clienta
app.post(`${API}/clients`, (req: Request, res: Response) => {
    if (req.body.name === undefined || req.body.email === undefined) {
        res.status(409);
        res.json({ error: 'Missing required fields' });
        return;
    }
    const bankAccount = new BankAccount(req.body.bankAccountBalance);
    const InvestmentAccount = new Account(req.body.investmentAccountBalance, bankAccount);
    const person = new Person(req.body.name, req.body.email, bankAccount, InvestmentAccount );

    const client = clients.addClient(person);

    res.json(client);
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

    res.json(client);
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

    res.json(client);
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
    const investmentSuccess = client.getInvestmentAccount().investInStock(stock, amount);

    if (investmentSuccess) {
        res.json({
            message: `Invested ${amount} in ${stockSymbol}`,
            balance: client.getInvestmentAccount().balance,
            stock: {
                symbol: stockSymbol,
                shares: stock.totalShares,
                stockPrice: stock.stockPrice,
            },
        });
    } else {
        res.status(400).json({ error: 'Investment failed: Insufficient balance or unable to buy shares' });
    }
});

app.listen(port, () => {
    console.log(`Server is WORKING at http://localhost:${port}/`);
});