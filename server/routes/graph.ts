import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

router.get("/:filename", (req: Request, res: Response) => {
    const { filename } = req.params;
    if (!filename) {
        return res.status(400).json({ error: "Filename is required" });
    }
    const safeFilename = path.basename(filename);
    const filePath = path.join(__dirname, "data", safeFilename);
    console.log("Serving file:", filePath);
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
    }
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    fileStream.on("error", (err) => {
        console.error("File stream error:", err);
        res.status(500).end("Error reading file");
    });
});

export default router;