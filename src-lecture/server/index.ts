import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/api', (req: Request, res: Response) => {
    res.json({message: 'Hello, this is your Express.js REST API!'});
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
