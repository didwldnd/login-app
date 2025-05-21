import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 외부에서 접근 가능하게
    port: 5137,      // 개발용 포트
    proxy: {
      '/api': {
        target: 'http://13.124.190.188:8081', // ✅ 서버 포트 맞추기
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
