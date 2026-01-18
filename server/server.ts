import express, { Request, Response } from "express";
import cors from "cors";
import algorithmRouter from './routes/algorithm.js';
import graphRouter from './routes/graph.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

const corsOptions = {
    origin: [process.env.CLIENT_URL || "http://localhost:5173"],
};

app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
    res.json({ fruits: ['apple', 'banana', 'cherry'] });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.use('/algorithm', algorithmRouter);
app.use('/graph', graphRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});