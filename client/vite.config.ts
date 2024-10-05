import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import Sitemap from "vite-plugin-sitemap";
import tsconfigPaths from "vite-tsconfig-paths";

const hostname = "https://www.portfolio.andrijadesign.com/";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
        changeOrigin: true
      }
    }
  },
  plugins: [
    react(),
    tsconfigPaths(), // Add tsconfigPaths here to resolve aliases
    Sitemap({
      hostname,
      exclude: ["/success", "/not-found"],
      readable: true,
      generateRobotsTxt: true,
      robots: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/admin", "/success", "/not-found"]
        }
      ]
    })
  ],
  resolve: {
    alias: {
      "@": "/src"
    }
  }
});
