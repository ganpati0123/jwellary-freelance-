import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createShopifyRouter } from "./shopifyApi.ts";

const app = express();
const port = Number(process.env.PORT || 5000);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

app.disable("x-powered-by");
app.use(createShopifyRouter());
app.use(express.static(dist));
app.use((request, response, next) => {
  if (request.method !== "GET" || request.path.startsWith("/api/")) {
    next();
    return;
  }
  response.sendFile(path.join(dist, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Storefront server listening on port ${port}`);
});
