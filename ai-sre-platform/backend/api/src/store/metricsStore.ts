import { MetricsPayload } from "../types";

const metricsStore: MetricsPayload[] = [];

export function saveMetrics(payload: MetricsPayload) {
  metricsStore.push(payload);
}

export function getMetrics(service?: string) {
  if (!service) return metricsStore;
  return metricsStore.filter(m => m.service === service);
}
