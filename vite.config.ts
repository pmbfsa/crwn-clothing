import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  build: {
    emptyOutDir: true,
  },
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Crwn Clothing by Paulo Márcio',
        short_name: 'Crwn Clothing',
        theme_color: '#000000',
        icons: [
          { src: 'crwn-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'crwn-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
});
