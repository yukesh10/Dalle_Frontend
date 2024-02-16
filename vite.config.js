import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      proxy: {
        '/api': {
          target: 'https://dalle-clone-backend-6ade6a452c7f.herokuapp.com',
          changeOrigin: true,
          secure: false
        },
      },
    },
});