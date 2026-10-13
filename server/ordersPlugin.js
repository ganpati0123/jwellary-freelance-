import express from "express";

export function ordersApiPlugin() {
  return {
    name: "orders-api-routes",
    async configureServer(server) {
      const { createOrdersRouter } = await server.ssrLoadModule("/server/ordersApi.ts");
      const api = express();
      api.use(createOrdersRouter());
      server.middlewares.use(api);
    },
  };
}
