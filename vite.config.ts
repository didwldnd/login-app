import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // ✅ 외부 접속 허용
    port: 5137,       // ✅ 포트 강제 설정
    proxy: {
      '/api': {
        target: 'http://13.124.190.188:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})