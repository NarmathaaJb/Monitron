export interface MetricsPayload {
  service: string;
  metrics: {
    requestCount: number;
    errorCount: number;
    totalLatency: number;
    avgLatency: number;
    timestamp: number;
  };
  collectedAt: string;
}
