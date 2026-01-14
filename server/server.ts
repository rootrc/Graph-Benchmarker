import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 8080;

interface CorsOptions {
    origin: string[];
}

const corsOptions: CorsOptions = {
    origin: ["http://localhost:5173", "https://graph-benchmarker.vercel.app"],
};

app.use(cors(corsOptions));

app.get("/api", (req: Request, res: Response) => {
    res.json({ fruits: ['apple', 'banana', 'cherry'] });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
