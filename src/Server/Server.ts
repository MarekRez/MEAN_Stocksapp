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
        updatedFields.investmentAccount = new Account(updatedInvestmentAccountBalance, new BankAccount(0));
    }

    const client = clients.updateClientByEmail(email, updatedFields);

    if (!client) {
        res.status(404);
        res.json({ error: 'Client not found' });
        return;
    }

    res.json(client);
    });


app.listen(port, () => {
    console.log(`Server is WORKING at http://localhost:${port}/`);
});