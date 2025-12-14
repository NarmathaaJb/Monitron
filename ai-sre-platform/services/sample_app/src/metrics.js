let metrics = {
  requestCount: 0,
  errorCount: 0,
  totalLatency: 0,
};

function recordMetric(latency, error) {
  metrics.requestCount += 1;
  metrics.errorCount += error;
  metrics.totalLatency += latency;
}

function getMetrics() {
  return {
    ...metrics,
    avgLatency:
      metrics.requestCount === 0
        ? 0
        : metrics.totalLatency / metrics.requestCount,
    timestamp: Date.now(),
  };
}

module.exports = { recordMetric, getMetrics };
