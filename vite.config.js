import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import * as path from 'path'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      cache: false
    }),
    VueSetupExtend()
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8089',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
