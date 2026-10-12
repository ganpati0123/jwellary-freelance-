import express from "express";
import { shopifyStorefrontRequest } from "./shopifyStorefrontClient.ts";
import { getWhatsAppOrderSetupStatus, sendWhatsAppOrderDetails, WhatsAppOrderError } from "./whatsappClient.ts";

const PRODUCT_PAGE_SIZE = 20;
const MAX_PRODUCT_PAGES = 20;
const CATALOG_TTL_MS = 60_000;
let cachedCatalog: { products: StorefrontProduct[]; expiresAt: number } | null = null;

type StorefrontVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
  selectedOptions: Array<{ name: string; value: string }>;
};

type StorefrontProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  featuredImage: { url: string; altText: string | null } | null;
  images: { nodes: Array<{ url: string; altText: string | null }> };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  variants: { nodes: StorefrontVariant[] };
  collections: { nodes: Array<{ handle: string; title: string }> };
};

const CATALOG_QUERY = `#graphql
  query StorefrontCatalog($after: String) {
    products(first: ${PRODUCT_PAGE_SIZE}, after: $after) {
      nodes {
        id
        handle
        title
        description
        productType
        tags
        availableForSale
        featuredImage { url altText }
        images(first: 3) { nodes { url altText } }
        priceRange { minVariantPrice { amount currencyCode } }
        variants(first: 10) {
          nodes {
            id
            title
            availableForSale
            price { amount currencyCode }
            selectedOptions { name value }
          }
        }
        collections(first: 4) { nodes { handle title } }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

const CART_CREATE = `#graphql
  mutation CartCreate($lines: [CartLineInput!]!, $buyerIdentity: CartBuyerIdentityInput!) {
    cartCreate(input: { lines: $lines, buyerIdentity: $buyerIdentity }) {
      cart { checkoutUrl }
      userErrors { field message }
    }
  }
`;

async function fetchCatalog(): Promise<StorefrontProduct[]> {
  if (cachedCatalog && Date.now() < cachedCatalog.expiresAt) {
    return cachedCatalog.products;
  }

  const allProducts: StorefrontProduct[] = [];
  let after: string | null = null;
  let hasNextPage = true;
  let pages = 0;

  while (hasNextPage && pages < MAX_PRODUCT_PAGES) {
    const data = await shopifyStorefrontRequest<{
      products: {
        nodes: StorefrontProduct[];
        pageInfo: { hasNextPage: boolean; endCursor: string | null };
      };
    }>(CATALOG_QUERY, { after });
    allProducts.push(...data.products.nodes);
    hasNextPage = data.products.pageInfo.hasNextPage;
    after = data.products.pageInfo.endCursor;
    pages += 1;
  }

  if (hasNextPage) {
    throw new Error(`Shopify catalog exceeds the ${PRODUCT_PAGE_SIZE * MAX_PRODUCT_PAGES}-product preview limit.`);
  }

  cachedCatalog = { products: allProducts, expiresAt: Date.now() + CATALOG_TTL_MS };
  return allProducts;
}

export function createShopifyRouter() {
  const router = express.Router();
  router.use(express.json({ limit: "32kb" }));

  router.get("/api/shopify/catalog", async (_request, response) => {
    try {
      const products = await fetchCatalog();
      response.json({ products });
    } catch (error) {
      console.error("Shopify catalog request failed:", error instanceof Error ? error.message : "Unknown error");
      response.status(503).json({
        error: "The Shopify catalog is temporarily unavailable. No preview products can be purchased.",
      });
    }
  });

  router.get("/api/shopify/checkout-status", (_request, response) => {
    response.json(getWhatsAppOrderSetupStatus());
  });

  router.post("/api/shopify/checkout", async (request, response) => {
    try {
      const rawLines = request.body?.lines;
      if (!Array.isArray(rawLines) || rawLines.length === 0 || rawLines.length > 50) {
        throw new WhatsAppOrderError("Choose at least one available product to continue.", 400);
      }
      if (request.body?.whatsappConsent !== true) {
        throw new WhatsAppOrderError("Consent is required before sharing delivery details with the studio on WhatsApp.", 400);
      }

      const submittedCustomer = request.body?.customer;
      const boundedText = (value: unknown, label: string, maxLength: number, required = true) => {
        if (typeof value !== "string") {
          if (!required) return "";
          throw new WhatsAppOrderError(`Enter your ${label}.`, 400);
        }
        const cleaned = value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
        if (!cleaned && required) throw new WhatsAppOrderError(`Enter your ${label}.`, 400);
        if (cleaned.length > maxLength) throw new WhatsAppOrderError(`Your ${label} is too long.`, 400);
        return cleaned;
      };

      const customerName = boundedText(submittedCustomer?.name, "name", 100);
      const email = boundedText(submittedCustomer?.email, "email address", 254).toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new WhatsAppOrderError("Enter a valid email address.", 400);
      }
      const phoneInput = boundedText(submittedCustomer?.phone, "phone number", 24);
      const phoneDigits = phoneInput.replace(/\D/g, "");
      const phone = phoneInput.trim().startsWith("+")
        ? `+${phoneDigits}`
        : phoneDigits.length === 10
          ? `+91${phoneDigits}`
          : phoneDigits.length === 12 && phoneDigits.startsWith("91")
            ? `+${phoneDigits}`
            : "";
      if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
        throw new WhatsAppOrderError("Enter a valid Indian phone number, with or without the +91 prefix.", 400);
      }
      const address1 = boundedText(submittedCustomer?.address1, "address", 120);
      const address2 = boundedText(submittedCustomer?.address2, "apartment or landmark", 120, false);
      const city = boundedText(submittedCustomer?.city, "city", 60);
      const province = boundedText(submittedCustomer?.province, "state", 60);
      const postalCode = boundedText(submittedCustomer?.postalCode, "PIN code", 10);
      if (!/^\d{6}$/.test(postalCode)) {
        throw new WhatsAppOrderError("Enter a valid six-digit Indian PIN code.", 400);
      }
      const note = boundedText(submittedCustomer?.note, "delivery note", 300, false);
      const nameParts = customerName.split(/\s+/);
      const customer = {
        name: customerName,
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(" "),
        email,
        phone,
        address1,
        address2,
        city,
        province,
        postalCode,
        note,
      };

      const products = await fetchCatalog();
      const availableVariants = new Map(
        products.flatMap((product) =>
          product.variants.nodes
            .filter((variant) => variant.availableForSale)
            .map((variant) => [variant.id, { product, variant }] as const),
        ),
      );
      const orderItems = rawLines.map((line: { variantId?: unknown; quantity?: unknown }) => {
        if (typeof line?.variantId !== "string" || !availableVariants.has(line.variantId)) {
          throw new WhatsAppOrderError("One or more products are no longer available. Refresh your bag and try again.", 400);
        }
        const quantity = Number(line.quantity);
        if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
          throw new WhatsAppOrderError("Choose a quantity between 1 and 20.", 400);
        }
        const { product, variant } = availableVariants.get(line.variantId)!;
        return {
          merchandiseId: line.variantId,
          quantity,
          title: product.title,
          variantTitle: variant.title,
          unitPrice: variant.price.amount,
          currencyCode: variant.price.currencyCode,
        };
      });
      const currencyCode = orderItems[0].currencyCode;
      if (orderItems.some((item) => item.currencyCode !== currencyCode)) {
        throw new WhatsAppOrderError("The basket contains products with different currencies. Remove items and try again.", 400);
      }
      const subtotal = orderItems.reduce((sum, item) => sum + Number(item.unitPrice) * item.quantity, 0);

      const data = await shopifyStorefrontRequest<{
        cartCreate: {
          cart: { checkoutUrl: string } | null;
          userErrors: Array<{ message: string }>;
        };
      }>(CART_CREATE, {
        lines: orderItems.map(({ merchandiseId, quantity }) => ({ merchandiseId, quantity })),
        buyerIdentity: {
          email: customer.email,
          phone: customer.phone,
          countryCode: "IN",
          deliveryAddressPreferences: [{
            deliveryAddress: {
              firstName: customer.firstName,
              lastName: customer.lastName,
              address1: customer.address1,
              ...(customer.address2 ? { address2: customer.address2 } : {}),
              city: customer.city,
              province: customer.province,
              zip: customer.postalCode,
              countryCode: "IN",
              phone: customer.phone,
            },
          }],
        },
      });

      const result = data.cartCreate;
      if (result.userErrors.length) {
        throw new WhatsAppOrderError(result.userErrors[0].message, 400);
      }
      if (!result.cart?.checkoutUrl) {
        throw new WhatsAppOrderError("Shopify did not return a secure checkout URL.", 503);
      }

      await sendWhatsAppOrderDetails({
        customer,
        items: orderItems,
        subtotal: subtotal.toFixed(2),
        currencyCode,
      });

      const checkoutUrl = new URL(result.cart.checkoutUrl);
      if (process.env.NODE_ENV !== "production") {
        checkoutUrl.searchParams.set("channel", "online_store");
      }
      response.json({ checkoutUrl: checkoutUrl.toString(), whatsappAccepted: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Secure checkout is temporarily unavailable.";
      const status = error instanceof WhatsAppOrderError
        ? error.status
        : 503;
      if (status >= 500) {
        console.error("Checkout preparation failed:", message);
      }
      response.status(status).json({ error: message });
    }
  });

  return router;
}
