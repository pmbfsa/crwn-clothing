import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  base: '/crwn-clothing/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  plugins: [react(), svgr()],
});
