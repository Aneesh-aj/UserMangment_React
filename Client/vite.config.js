import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3400', // Update this to match your backend server port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
