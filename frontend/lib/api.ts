const API_BASE = "http://localhost:3000"; 

export async function api<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T | null> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`API error: ${res.status} - ${error}`);
  }

  const text = await res.text();
  if (!text) return null;

  return JSON.parse(text);
}
