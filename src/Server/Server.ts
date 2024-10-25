import express, {Request, Response} from "express";
import {BankAccount} from "../Classes/BankAccount";
import {Account} from "../Classes/Account";
import {Person} from "../Classes/Person";
import {Stock} from "../Classes/Stock";
import {StockSymbol} from "../Enums/StockSymbol";

const app = express();
const port = 3000;
const API = '/api';

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send("Hello, this is Marek's website 🚀!");
});

const apple = new Stock(StockSymbol.AAPL, "USD", 150, 0.02, 0.6, 0.2);

app.post(`${API}/persons`, (req: Request, res: Response) => {

    const bankAccount1 = new BankAccount(req.body.balance);
    const InvestmentAccount1 = new Account(req.body.balance, bankAccount1);
    const Marek = new Person(req.body.name, req.body.email, bankAccount1, InvestmentAccount1 );
    res.json(Marek);
});

app.listen(port, () => {
    console.log(`Server is WORKING at http://localhost:${port}/`);
});
