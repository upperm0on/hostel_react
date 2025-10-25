import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',        // so it's accessible externally
    port: 5173,             // Consumer React App
    strictPort: true,       // don't auto-switch ports
    cors: true,
    allowedHosts: true,     // allow cross-origin
    hmr: {
      port: 5173           // use same port for HMR
    }
  }
})
