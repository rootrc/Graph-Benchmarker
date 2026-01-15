import { Router, Request, Response } from "express";

const router = Router();

router.post("/run", (req: Request, res: Response) => {
    console.log("meow");
});

export default router;