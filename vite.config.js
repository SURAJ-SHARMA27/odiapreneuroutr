import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/register': 'http://localhost:3000',
      '/signin': 'http://localhost:3000',
      '/about': 'http://localhost:3000',
      '/contact': 'http://localhost:3000',
      '/registeredteams': 'http://localhost:3000',
      '/logout': 'http://localhost:3000'
    },
  },
});
