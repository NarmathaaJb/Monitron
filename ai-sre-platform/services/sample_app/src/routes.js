const express = require("express");
const { recordMetric } = require("./metrics");

const router = express.Router();

// Health check
router.get("/health", (req, res) => {
  recordMetric(50, 0);
  res.json({ status: "UP" });
});

// Users API
router.get("/api/users", (req, res) => {
  const latency = Math.random() * 200;
  setTimeout(() => {
    recordMetric(latency, 0);
    res.json({ users: ["Alice", "Bob", "Charlie"] });
  }, latency);
});

// Orders API (intentionally unstable)
router.get("/api/orders", (req, res) => {
  const latency = Math.random() * 1000;
  const errorChance = Math.random();

  setTimeout(() => {
    if (errorChance > 0.8) {
      recordMetric(latency, 1);
      console.error("❌ Order service failed");
      return res.status(500).json({ error: "Order service failure" });
    }

    recordMetric(latency, 0);
    res.json({ orders: ["Order1", "Order2"] });
  }, latency);
});

const { getMetrics } = require("./metrics");

router.get("/metrics", (req, res) => {
  res.json(getMetrics());
});


module.exports = router;


