import express, { Request, Response } from 'express';
import {Bank} from './classes/Bank';
import {Person} from './classes/Person';

const app = express();
const port = 3000;

const API = '/api';

const bank = new Bank();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, this is your Express.js server 🚀!');
});

app.get(`${API}/clients`, (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(bank.getClients());
});

app.post(`${API}/clients`, (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.body.firstName === undefined || req.body.lastName === undefined) {
        res.status(409);
        res.json({ error: 'Missing required fields' });
        return;
    }
    const person = new Person(req.body.firstName, req.body.lastName);
    const id = bank.addClient(person);
    res.json(id);
});

app.get(`${API}/clients/:id`, (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        res.status(409);
        res.json({ error: 'Invalid id' });
        return;
    }

    const client = bank.getClient(id);

    if (!client) {
        res.status(404);
        res.json({ error: 'Client not found' });
        return;
    }

    res.json(client);
});

app.delete(`${API}/clients/:id`, (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        res.status(409);
        res.json({ error: 'Invalid id' });
        return;
    }

    const client = bank.getClient(id);

    if (!client) {
        res.status(404);
        res.json({ error: 'Client not found' });
        return;
    }

    bank.deleteClient(id);

    res.json();
});

app.put(`${API}/clients/:id`, (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        res.status(409);
        res.json({ error: 'Invalid id' });
        return;
    }

    if (req.body.firstName === undefined || req.body.lastName === undefined) {
        res.status(409);
        res.json({ error: 'Missing required fields' });
        return;
    }

    const client = bank.updateClient(id, req.body.firstName, req.body.lastName);

    if (!client) {
        res.status(404);
        res.json({ error: 'Client not found' });
        return;
    }

    res.json();
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});
