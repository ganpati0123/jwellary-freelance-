import { ReplitConnectors } from "@replit/connectors-sdk";

export class WhatsAppOrderError extends Error {
  status: number;

  constructor(message: string, status = 502) {
    super(message);
    this.name = "WhatsAppOrderError";
    this.status = status;
  }
}

type WhatsAppOrderDetails = {
  customer: {
    name: string;
    email: string;
    phone: string;
    address1: string;
    address2?: string;
    city: string;
    province: string;
    postalCode: string;
    note?: string;
  };
  items: Array<{
    title: string;
    variantTitle: string;
    quantity: number;
    unitPrice: string;
    currencyCode: string;
  }>;
  subtotal: string;
  currencyCode: string;
};

export function getWhatsAppOrderSetupStatus() {
  const missing = [
    !process.env.WHATSAPP_ORDER_RECIPIENT && "order recipient number",
    !process.env.WHATSAPP_PHONE_NUMBER_ID && "Meta sender phone number ID",
    !process.env.WHATSAPP_ORDER_TEMPLATE_NAME && "approved WhatsApp order template name",
    !process.env.WHATSAPP_ORDER_TEMPLATE_LANGUAGE && "approved template language code",
  ].filter(Boolean) as string[];

  return { ready: missing.length === 0, missing };
}

export async function sendWhatsAppOrderDetails(details: WhatsAppOrderDetails) {
  const { ready, missing } = getWhatsAppOrderSetupStatus();
  if (!ready) {
    throw new WhatsAppOrderError(`WhatsApp setup is incomplete: add the ${missing.join(", ")} in Replit settings.`, 503);
  }

  const recipient = process.env.WHATSAPP_ORDER_RECIPIENT!;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID!;
  const templateName = process.env.WHATSAPP_ORDER_TEMPLATE_NAME!;
  const templateLanguage = process.env.WHATSAPP_ORDER_TEMPLATE_LANGUAGE!;

  const itemSummary = details.items
    .map(({ title, variantTitle, quantity, unitPrice, currencyCode }) => {
      const variant = variantTitle && variantTitle !== "Default Title" ? ` (${variantTitle})` : "";
      return `${title}${variant} × ${quantity} — ${currencyCode} ${unitPrice}`;
    })
    .join("\n");
  const deliveryAddress = [
    details.customer.address1,
    details.customer.address2,
    `${details.customer.city}, ${details.customer.province} ${details.customer.postalCode}, India`,
    details.customer.note ? `Delivery note: ${details.customer.note}` : "",
  ].filter(Boolean).join("\n");
  const parameters = [
    details.customer.name,
    `Phone: ${details.customer.phone}\nEmail: ${details.customer.email}`,
    deliveryAddress,
    `${itemSummary}\nSubtotal: ${details.currencyCode} ${details.subtotal}`,
  ];

  if (parameters.some((value) => value.length > 1024)) {
    throw new WhatsAppOrderError(
      "The order details are too long for the approved WhatsApp template. Reduce the number of different items or use a template with more detail fields.",
      400,
    );
  }

  const connectors = new ReplitConnectors();
  let response: Response;
  try {
    response = await connectors.proxy(
      "whatsapp-business",
      `/v23.0/${encodeURIComponent(phoneNumberId)}/messages`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: recipient,
          type: "template",
          template: {
            name: templateName,
            language: { code: templateLanguage },
            components: [{
              type: "body",
              parameters: parameters.map((text) => ({ type: "text", text })),
            }],
          },
        }),
      },
    );
  } catch {
    throw new WhatsAppOrderError("WhatsApp could not be reached. Your payment page was not opened; please try again.");
  }

  const payload = await response.json().catch(() => ({})) as {
    error?: { code?: number };
    messages?: Array<{ id?: string }>;
  };

  if (!response.ok) {
    const code = payload.error?.code;
    if (response.status === 401 || response.status === 403 || code === 190) {
      throw new WhatsAppOrderError(
        "The WhatsApp Business connection rejected its access token. Update the existing WhatsApp connection in Replit before accepting checkout details.",
        503,
      );
    }
    if (code === 131047 || code === 132000 || code === 132001) {
      throw new WhatsAppOrderError(
        "WhatsApp did not accept the approved order template. Check that its name, language and four body placeholders match the configured template.",
        503,
      );
    }
    throw new WhatsAppOrderError("WhatsApp could not accept the order notification. The payment page was not opened; please try again.");
  }

  if (!payload.messages?.[0]?.id) {
    throw new WhatsAppOrderError("WhatsApp did not confirm the order notification. The payment page was not opened; please try again.");
  }

  return { accepted: true as const };
}
