import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // FormCMS API
      '/api': {
        target: 'http://127.0.0.1:5265',
        changeOrigin: true
      },
      // Product images / uploaded files served by the backend
      '/files': {
        target: 'http://127.0.0.1:5265',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: '../backend/wwwroot',
    emptyOutDir: false
  }
})
