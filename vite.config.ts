import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    Pages({
      // agora olha dentro de src/app em vez de app/
      dirs: 'src/app',
      extensions: ['tsx','jsx'],
      routeStyle: 'next',  // Next‑style: page.tsx vira índice
    }),
  ],
  resolve: {
    alias: {
      // @ aponta para src/
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
