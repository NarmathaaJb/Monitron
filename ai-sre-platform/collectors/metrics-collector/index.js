const axios = require("axios");

const SERVICE_NAME = "sample-app";
const METRICS_ENDPOINT = "http://localhost:3001/metrics";
const BACKEND_ENDPOINT = "http://localhost:4000/metrics";
const INTERVAL = 5000; // 5 seconds

async function collectMetrics() {
  try {
    // 1️⃣ Pull metrics from sample app
    const response = await axios.get(METRICS_ENDPOINT);

    const payload = {
      service: SERVICE_NAME,
      metrics: response.data,
      collectedAt: new Date().toISOString(),
    };

    // 2️⃣ Send metrics to central backend
    await axios.post(BACKEND_ENDPOINT, payload);

    console.log("✅ Sent metrics to backend:", payload);
  } catch (err) {
    console.error("⚠️ Failed to collect/send metrics:", err.message);
  }
}

setInterval(collectMetrics, INTERVAL);

console.log("🚀 Metrics Collector started...");
