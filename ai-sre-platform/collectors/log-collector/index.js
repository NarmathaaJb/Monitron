const axios = require("axios");

const BACKEND_ENDPOINT = "http://localhost:4000/logs";

// Simulated log stream (later this will be real)
const logs = [];

function ingestLog(log) {
  logs.push(log);
}

async function sendLogs() {
  if (logs.length === 0) return;

  try {
    await axios.post(BACKEND_ENDPOINT, logs);
    console.log(`📨 Sent ${logs.length} logs to backend`);
    logs.length = 0;
  } catch (err) {
    console.error("⚠️ Failed to send logs:", err.message);
  }
}

// TEMP: simulate logs until we wire real streaming
setInterval(() => {
  ingestLog({
    service: "sample-app",
    level: "INFO",
    message: "Heartbeat log",
    timestamp: Date.now()
  });
}, 3000);

setInterval(sendLogs, 5000);

console.log("🚀 Log Collector started...");
