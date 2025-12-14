const axios = require("axios");

const SERVICE_NAME = "sample-app";
const METRICS_ENDPOINT = "http://localhost:3001/metrics";
const INTERVAL = 5000; // 5 seconds

async function collectMetrics() {
  try {
    const response = await axios.get(METRICS_ENDPOINT);

    const payload = {
      service: SERVICE_NAME,
      metrics: response.data,
      collectedAt: new Date().toISOString(),
    };

    console.log("📊 Collected Metrics:", payload);
  } catch (err) {
    console.error("⚠️ Failed to collect metrics:", err.message);
  }
}

setInterval(collectMetrics, INTERVAL);

console.log("🚀 Metrics Collector started...");
