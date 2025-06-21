"use server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE}/api/v1/pay/${input}`, {
    credentials: "include",
    ...init,
  });
  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
