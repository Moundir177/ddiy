import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: import.meta.env.PROD ? 'https://your-app-name.fly.dev' : 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  root: 'public'
});
