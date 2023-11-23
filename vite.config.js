import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

// const useitforlocal = `https://odiapreneurbackend.onrender.com/`
 const useitforlocal=`http://localhost:3000/`

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/register': useitforlocal,
      '/signin': useitforlocal,
      '/about': useitforlocal,
      '/contact': useitforlocal,
      '/registeredteams': useitforlocal,
      '/logout': useitforlocal,
      '/search':useitforlocal,
      '/search_so':useitforlocal,
      '/publishstatus':useitforlocal
    },
  },
});
