import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import algorithmRouter from './routes/algorithm.js';
import databaseRouter from './routes/database.js';

const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: [process.env.CLIENT_URL || "http://localhost:5173"],
};

app.use(cors(corsOptions));

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.use('/algorithm', algorithmRouter);
app.use('/database', databaseRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});