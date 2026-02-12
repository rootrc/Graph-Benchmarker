import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import path from "path";
import fs from "fs";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const router = Router();

// router.get("/:filename", (req: Request, res: Response) => {
//     const { filename } = req.params;
//     if (!filename) {
//         return res.status(400).json({ error: "Filename is required" });
//     }
//     const safeFilename = path.basename(filename);
//     const filePath = path.join(process.cwd(), "data", safeFilename);
//     console.log("Serving file:", filePath);
//     if (!fs.existsSync(filePath)) {
//         return res.status(404).json({ error: "File not found" });
//     }
//     const fileStream = fs.createReadStream(filePath);
//     fileStream.pipe(res);
//     fileStream.on("error", (err) => {
//         console.error("File stream error:", err);
//         res.status(500).end("Error reading file");
//     });
// });

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT graph_data
       FROM graphs_json
       WHERE graph_id = $1`,
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Graph not found" });
    }
    res.json(result.rows[0].graph_data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export default router;