import { Router } from "express";
import { saveMetrics, getMetrics } from "../store/metricsStore";
import { MetricsPayload } from "../types";

const router = Router();

// Collector sends metrics here
router.post("/", (req, res) => {
  const payload = req.body as MetricsPayload;
  saveMetrics(payload);
  res.status(201).json({ message: "Metrics stored" });
});

// Dashboard fetches metrics here
router.get("/", (req, res) => {
  const service = req.query.service as string | undefined;
  res.json(getMetrics(service));
});

export default router;
