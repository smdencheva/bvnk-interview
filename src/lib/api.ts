import type { PaySummary } from "./types/payment.types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetcher<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    credentials: "include",
    ...init,
  });
  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

/**
 * GET /api/v1/pay/:uuid/summary
 */
export async function getPaySummary(uuid: string): Promise<PaySummary> {
  const url = `${API_BASE}/api/v1/pay/${uuid}/summary`;
  return fetcher<PaySummary>(url);
}

/**
 * PUT /api/v1/pay/:uuid/update/summary
 */
export async function updatePaySummary(
  uuid: string,
  currency: string,
  payInMethod: string,
): Promise<PaySummary> {
  const url = `${API_BASE}/api/v1/pay/${uuid}/update/summary`;
  return fetcher<PaySummary>(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ currency, payInMethod }),
  });
}

/**
 * PUT /api/v1/pay/:uuid/accept/summary
 */
export async function acceptPaySummary(uuid: string): Promise<PaySummary> {
  const url = `${API_BASE}/api/v1/pay/${uuid}/accept/summary`;
  return fetcher<PaySummary>(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ successUrl: "" }),
  });
}
