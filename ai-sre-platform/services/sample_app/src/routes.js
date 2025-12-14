const express = require("express");
const { recordMetric, getMetrics } = require("./metrics");

const router = express.Router();

// 🔹 Structured logger
function log(level, message) {
  console.log(
    JSON.stringify({
      service: "sample-app",
      level,
      message,
      timestamp: Date.now(),
    })
  );
}

// Health check
router.get("/health", (req, res) => {
  recordMetric(50, 0);
  log("INFO", "Health check successful");
  res.json({ status: "UP" });
});

// Users API
router.get("/api/users", (req, res) => {
  const latency = Math.random() * 200;
  setTimeout(() => {
    recordMetric(latency, 0);
    log("INFO", "Users fetched successfully");
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
      log("ERROR", "Order service failed");
      return res.status(500).json({ error: "Order service failure" });
    }

    recordMetric(latency, 0);
    log("INFO", "Order request processed successfully");
    res.json({ orders: ["Order1", "Order2"] });
  }, latency);
});

// Metrics endpoint
router.get("/metrics", (req, res) => {
  res.json(getMetrics());
});

module.exports = router;
