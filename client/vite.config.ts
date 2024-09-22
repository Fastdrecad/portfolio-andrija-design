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
      "@components": resolve(__dirname, "./src/components"),
      "@constants": resolve(__dirname, "./src/constants"),
      "@context": resolve(__dirname, "./src/context"),
      "@hooks": resolve(__dirname, "./src/hooks"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@redux": resolve(__dirname, "./src/redux"),
      "@routes": resolve(__dirname, "./src/routes"),
      "@styles": resolve(__dirname, "./src/styles"),
      "@utils": resolve(__dirname, "./src/utils")
    }
  }
});
