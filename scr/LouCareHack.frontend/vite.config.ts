import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8081,
    proxy: {
      '/api': {
        target: 'https://loucarehackapi20250222205032-e6e6a0ejf2afcqfn.canadacentral-01.azurewebsites.net',
        changeOrigin: true,
        secure: false,
        headers: {
          'Accept': 'application/json'
        }
      }
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
