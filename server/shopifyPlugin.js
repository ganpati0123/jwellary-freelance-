import express from 'express';

export function shopifyApiPlugin() {
  return {
    name: 'shopify-api-routes',
    async configureServer(server) {
      const { createShopifyRouter } = await server.ssrLoadModule('/server/shopifyApi.ts');
      const api = express();
      api.use(createShopifyRouter());
      server.middlewares.use(api);
    }
  };
}
