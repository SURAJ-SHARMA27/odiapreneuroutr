import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

// const useitforlocal = `https://odiapreneurbackend.onrender.com/`
const useitforlocal=`http://localhost:3000/`

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/register': useitforlocal,
      '/api/signin': useitforlocal,
      '/api/about': useitforlocal,
      '/api/contact': useitforlocal,
      '/api/registeredteams': useitforlocal,
      '/api/logout': useitforlocal,
      '/api/search':useitforlocal,
      '/api/search_so':useitforlocal,
      '/api/publishstatus':useitforlocal
    },
  },
});
