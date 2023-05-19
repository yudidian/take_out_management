import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import * as path from 'path'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/style/utils/computedSize.scss";'
      }
    }
  },
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
    port: 8800,
    proxy: {
      '/api': {
        // target: 'http://47.109.54.152:8089',
        target: 'http://localhost:8089',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  // build configure
  build: {
    outDir: 'dist',
    // esbuild 打包更快，但是不能去除 console.log
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
