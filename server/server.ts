import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";
import algorithmRouter from './routes/algorithm.js';
import graphRouter from './routes/graph.js';
import path from "path/win32";
import fs from "fs";

const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: [process.env.CLIENT_URL || "http://localhost:5173"],
};

app.use(cors(corsOptions));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get("/pgtest/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    if (!filename) {
      return res.status(400).json({ error: "Filename is required" });
    }
    const safeFilename = path.basename(filename);
    const filePath = path.join(process.cwd(), "data", safeFilename);
    try {
      await fs.promises.access(filePath);
    } catch {
      return res.status(404).json({ error: "File not found" });
    }
    const fileContent = await fs.promises.readFile(filePath, "utf8");
    let parsedJson;
    try {
      parsedJson = JSON.parse(fileContent);
    } catch (e) {
      return res.status(400).json({ error: "Invalid JSON file" });
    }
    if (!["weighted-graph", "unweighted-graph"].includes(parsedJson.type)) {
      return res.status(400).json({ error: "Invalid graph type" });
    }
    await pool.query(
      `INSERT INTO graphs_json (graph_id, type, graph_data)
      VALUES ($1, $2, $3)
      ON CONFLICT (graph_id) DO NOTHING`,
      [2, parsedJson.type, parsedJson]
    );
    res.sendFile(filePath);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.use('/algorithm', algorithmRouter);
app.use('/graph', graphRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});