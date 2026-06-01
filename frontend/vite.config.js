import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    // Proxy all /api requests to the Spring Boot backend.
    // This means the browser never makes a cross-origin request — the Vite
    // dev server forwards them server-side, so CORS headers are irrelevant
    // in development.  In production, configure your reverse-proxy (Nginx /
    // Apache) the same way.
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
