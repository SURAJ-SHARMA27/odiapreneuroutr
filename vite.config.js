import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

const useit = `https://odiapreneurbackend.onrender.com/`

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/register': useit,
      '/signin': useit,
      '/about': useit,
      '/contact': useit,
      '/registeredteams': useit,
      '/logout': useit,
      '/search':useit,
      '/search_so':useit,
      '/publishstatus':useit
    },
  },
});
