import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // Cuando tu app haga fetch a /api/orders/upcoming
        target: 'https://129bc152-4e38-b755-534a4ee46195.mock.pstmn.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Reescribe la URL para eliminar /api
        // secure: false, // Si el mock server usa HTTPS con un certificado autofirmado (no es el caso aquí)
      },
    },
  },
});