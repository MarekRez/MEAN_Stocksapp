import express, {Request, Response} from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send("Hello, this is Marek's website 🚀!");
});

app.listen(port, () => {
    console.log(`Server is WORKING at http://localhost:${port}/`);
});
