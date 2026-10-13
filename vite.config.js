import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ordersApiPlugin } from './server/ordersPlugin.js';

export default defineConfig({
  plugins: [react(), ordersApiPlugin()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    allowedHosts: true
  }
});
