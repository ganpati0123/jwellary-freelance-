import { submitCheckoutOrder } from "../../server/orderService.ts";
import { WhatsAppOrderError } from "../../server/whatsappClient.ts";

type RequestLike = { method?: string; body?: unknown };
type ResponseLike = {
  status(code: number): ResponseLike;
  json(body: unknown): void;
};

export default async function handler(request: RequestLike, response: ResponseLike) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed." });
  }
  try {
    const result = await submitCheckoutOrder((request.body || {}) as Parameters<typeof submitCheckoutOrder>[0]);
    return response.status(201).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Your order could not be submitted.";
    const status = error instanceof WhatsAppOrderError ? error.status : 503;
    if (status >= 500) console.error("Order notification failed:", message);
    return response.status(status).json({ error: message });
  }
}
