import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import inspect from "vite-plugin-inspect";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false
      }
    }
  },
  plugins: [react(), inspect()],
  resolve: {
    alias: {
      "@": "/src"
    }
  }
});
