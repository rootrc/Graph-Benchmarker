import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;


const corsOptions = {
    origin: [process.env.CLIENT_URL || "http://localhost:5173"],
};

app.use(cors(corsOptions));

app.get("/api", (req: Request, res: Response) => {
    res.json({ fruits: ['apple', 'banana', 'cherry'] });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
