import type { PaySummary } from "./types/payment.types";
import { fetcher } from "./actions";

/**
 * GET /api/v1/pay/:uuid/summary
 */
export async function getPaySummary(uuid: string): Promise<PaySummary> {
  const url = `${uuid}/summary`;
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
  const url = `${uuid}/update/summary`;
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
  const url = `${uuid}/accept/summary`;
  return fetcher<PaySummary>(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ successUrl: "" }),
  });
}
