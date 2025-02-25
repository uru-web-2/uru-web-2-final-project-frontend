import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Tu backend
        changeOrigin: true,
        secure: false, // Si usas HTTPS con certificado autofirmado
        rewrite: (path) => path.replace(/^\/api/, ''), // Asegura que se quite el prefijo '/api'
      },
    },
  },
})
