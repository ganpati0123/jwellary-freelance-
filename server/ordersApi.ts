import express from "express";
import { submitCheckoutOrder } from "./orderService.ts";
import { getWhatsAppOrderSetupStatus, WhatsAppOrderError } from "./whatsappClient.ts";

export function createOrdersRouter() {
  const router = express.Router();
  router.use(express.json({ limit: "32kb" }));

  router.get("/api/checkout/status", (_request, response) => {
    response.setHeader("Cache-Control", "no-store");
    const setup = getWhatsAppOrderSetupStatus();
    response.json({ ...setup, ready: true, mode: setup.ready && !process.env.VERCEL ? "automatic" : "manual-share" });
  });

  router.post("/api/checkout/order", async (request, response) => {
    try {
      const result = await submitCheckoutOrder(request.body || {});
      response.status(201).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Your order could not be submitted.";
      const status = error instanceof WhatsAppOrderError ? error.status : 503;
      if (status >= 500) console.error("Order notification failed:", message);
      response.status(status).json({ error: message });
    }
  });

  return router;
}
