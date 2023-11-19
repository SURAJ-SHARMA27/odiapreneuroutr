import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

const baseUrl = `https://odia-preneur.onrender.com`

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/register': baseUrl,
      '/signin': baseUrl,
      '/about': baseUrl,
      '/contact': baseUrl,
      '/registeredteams': baseUrl,
      '/logout': baseUrl
    },
  },
});
