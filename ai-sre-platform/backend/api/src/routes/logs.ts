import { Router } from "express";

const router = Router();
const logs: any[] = [];

router.post("/", (req, res) => {
  logs.push(...req.body);
  res.status(201).json({ message: "Logs stored" });
});

router.get("/", (req, res) => {
  res.json(logs);
});

export default router;
