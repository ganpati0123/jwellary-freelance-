import { getWhatsAppOrderSetupStatus } from "../../server/whatsappClient.ts";

type RequestLike = { method?: string };
type ResponseLike = {
  setHeader(name: string, value: string): void;
  status(code: number): ResponseLike;
  json(body: unknown): void;
};

export default function handler(request: RequestLike, response: ResponseLike) {
  if (request.method !== "GET") {
    return response.status(405).json({ error: "Method not allowed." });
  }
  response.setHeader("Cache-Control", "no-store");
  const setup = getWhatsAppOrderSetupStatus();
  return response.status(200).json({ ...setup, ready: true, mode: "manual-share" });
}
