import { randomUUID } from "node:crypto";
import { products } from "../src/data.js";
import { getWhatsAppOrderSetupStatus, sendWhatsAppOrderDetails, WhatsAppOrderError } from "./whatsappClient.ts";

type CheckoutInput = {
  lines?: Array<{ productId?: unknown; quantity?: unknown }>;
  customer?: Record<string, unknown>;
  paymentReference?: unknown;
  whatsappConsent?: unknown;
};

const cleanText = (value: unknown, label: string, maxLength: number, required = true) => {
  if (typeof value !== "string") {
    if (!required) return "";
    throw new WhatsAppOrderError(`Enter your ${label}.`, 400);
  }
  const cleaned = value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
  if (!cleaned && required) throw new WhatsAppOrderError(`Enter your ${label}.`, 400);
  if (cleaned.length > maxLength) throw new WhatsAppOrderError(`Your ${label} is too long.`, 400);
  return cleaned;
};

export async function submitCheckoutOrder(input: CheckoutInput) {
  if (!Array.isArray(input.lines) || input.lines.length === 0 || input.lines.length > 50) {
    throw new WhatsAppOrderError("Choose at least one product to continue.", 400);
  }
  if (input.whatsappConsent !== true) {
    throw new WhatsAppOrderError("Consent is required before sharing delivery details on WhatsApp.", 400);
  }

  const rawCustomer = input.customer || {};
  const name = cleanText(rawCustomer.name, "name", 100);
  const email = cleanText(rawCustomer.email, "email address", 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new WhatsAppOrderError("Enter a valid email address.", 400);
  }
  const phoneInput = cleanText(rawCustomer.phone, "phone number", 24);
  const phoneDigits = phoneInput.replace(/\D/g, "");
  const phone = phoneInput.trim().startsWith("+")
    ? `+${phoneDigits}`
    : phoneDigits.length === 10
      ? `+91${phoneDigits}`
      : phoneDigits.length === 12 && phoneDigits.startsWith("91")
        ? `+${phoneDigits}`
        : "";
  if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
    throw new WhatsAppOrderError("Enter a valid phone number, with or without the +91 prefix.", 400);
  }

  const address1 = cleanText(rawCustomer.address1, "delivery address", 120);
  const address2 = cleanText(rawCustomer.address2, "apartment or landmark", 120, false);
  const city = cleanText(rawCustomer.city, "city", 60);
  const province = cleanText(rawCustomer.province, "state", 60);
  const postalCode = cleanText(rawCustomer.postalCode, "PIN code", 10);
  if (!/^\d{6}$/.test(postalCode)) {
    throw new WhatsAppOrderError("Enter a valid six-digit PIN code.", 400);
  }
  const note = cleanText(rawCustomer.note, "delivery note", 300, false);
  const paymentReference = cleanText(input.paymentReference, "UPI transaction reference", 60);
  if (!/^[A-Za-z0-9-]{6,60}$/.test(paymentReference)) {
    throw new WhatsAppOrderError("Enter the UPI transaction reference shown in your payment app.", 400);
  }

  const orderItems = input.lines.map((line) => {
    if (typeof line.productId !== "string") {
      throw new WhatsAppOrderError("One or more products are no longer available.", 400);
    }
    const product = products.find((item) => item.id === line.productId);
    if (!product || !product.inStock) {
      throw new WhatsAppOrderError("One or more products are no longer available.", 400);
    }
    const quantity = Number(line.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      throw new WhatsAppOrderError("Choose a quantity between 1 and 20.", 400);
    }
    return {
      title: product.name,
      variantTitle: "",
      quantity,
      unitPrice: String(product.price),
      currencyCode: "INR",
    };
  });
  const subtotal = orderItems.reduce((sum, item) => sum + Number(item.unitPrice) * item.quantity, 0);
  const orderReference = `OTS-${randomUUID().replaceAll("-", "").slice(0, 10).toUpperCase()}`;
  const orderDetails = {
    orderReference,
    paymentReference,
    customer: { name, email, phone, address1, address2, city, province, postalCode, note },
    items: orderItems,
    subtotal: subtotal.toFixed(2),
    currencyCode: "INR",
  };
  const setup = getWhatsAppOrderSetupStatus();
  if (!process.env.VERCEL && setup.ready) {
    try {
      await sendWhatsAppOrderDetails(orderDetails);
      return { orderReference, deliveryMode: "automatic" as const, paymentStatus: "pending-studio-verification" as const };
    } catch {
      console.error("Automatic WhatsApp delivery failed; using the manual share fallback.");
    }
  }

  const itemMessage = orderItems.map((item) =>
    `${item.title.slice(0, 72)} × ${item.quantity} — INR ${Number(item.unitPrice) * item.quantity}`
  ).join("\n");
  const addressMessage = [address1, address2, `${city}, ${province} ${postalCode}, India`, note ? `Note: ${note}` : ""]
    .filter(Boolean).join("\n");
  const message = [
    `Website order request ${orderReference}`,
    `Customer: ${name}`,
    `Phone: ${phone} · Email: ${email}`,
    `Delivery: ${addressMessage}`,
    `Items:\n${itemMessage}`,
    `Subtotal: INR ${subtotal}`,
    `UPI transaction reference (not verified): ${paymentReference}`,
  ].join("\n\n");
  if (message.length > 3500) {
    throw new WhatsAppOrderError("This order is too long to share in one WhatsApp message. Please split it into smaller orders.", 400);
  }
  return {
    orderReference,
    deliveryMode: "manual-share" as const,
    paymentStatus: "pending-studio-verification" as const,
    whatsappUrl: `https://wa.me/?text=${encodeURIComponent(message)}`,
  };
}
