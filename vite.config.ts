import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

const molApiProxy = {
  '/mol-api': {
    target: 'https://apiservice.mol.gov.tw',
    changeOrigin: true,
    rewrite: (proxyPath: string) => proxyPath.replace(/^\/mol-api/, '/OdService'),
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    proxy: molApiProxy,
  },
  preview: {
    proxy: molApiProxy,
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
