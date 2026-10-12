import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { shopifyApiPlugin } from './server/shopifyPlugin.js';

export default defineConfig({
  plugins: [react(), shopifyApiPlugin()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    allowedHosts: true
  }
});
