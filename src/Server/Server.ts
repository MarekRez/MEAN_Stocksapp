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

const bankAccount1 = new BankAccount(10000);
const InvestmentAccount1 = new Account(0, bankAccount1);
const Marek = new Person('Marek Rezny', 'rezny.marek@gmail.com', bankAccount1, InvestmentAccount1 );

app.get(`${API}/persons`, (req: Request, res: Response) => {
    res.json(bankAccount1.getBalance());
});

app.listen(port, () => {
    console.log(`Server is WORKING at http://localhost:${port}/`);
});
