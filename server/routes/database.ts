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

  export async function select(id: number) {
    return await pool.query(
      `SELECT graph_data
        FROM graphs_json
        WHERE graph_id = $1`,
      [id]
    );
  }

  router.get("/select/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await select(Number(id));
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Graph not found" });
      }
      res.json(result.rows[0].graph_data);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });

  // For testing: insert a file from the data directory into the database
  router.get("/insert/:filename", async (req, res) => {
    try {
      const { filename } = req.params;
      if (!filename) {
        return res.status(400).json({ error: "Filename is required" });
      }
      const safeFilename = path.basename(filename);
      const filePath = path.join(process.cwd(), "..", "data", safeFilename);
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
      const id = Number(req.query.graphId);
      await pool.query(
        `INSERT INTO graphs_json (graph_id, type, graph_data)
        VALUES ($1, $2, $3)
        ON CONFLICT (graph_id) DO NOTHING`,
        [id, parsedJson.type, parsedJson]
      );
      res.sendFile(filePath);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });


  export default router;