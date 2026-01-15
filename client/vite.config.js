import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://api-gateway:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // No rewrite needed if names match
      },
      '/socket.io': {
        target: 'http://api-gateway:8000',
        changeOrigin: true,
        ws: true
      }
    }
  }
})
