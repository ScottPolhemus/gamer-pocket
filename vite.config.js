import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: process.env.ASSET_PATH || `/`,
  plugins: [
    reactRefresh(),
    VitePWA({
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      }
    }),
  ],
  build: {
    outDir: 'build'
  },
  server: {
    strictPort: true,
    hmr: {
      port: process.env.PROJECT_ID ? 443 : null // Run the websocket server on the SSL port
    }
  }
})
