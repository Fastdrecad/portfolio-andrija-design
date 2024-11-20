import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import Sitemap from "vite-plugin-sitemap";
import tsconfigPaths from "vite-tsconfig-paths";

const hostname = "https://www.portfolio.andrijadesign.com/";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(`Loaded environment for mode ${mode}:`, env);
  return {
    define: {
      __API_BASE_URL__: JSON.stringify(env.VITE_API_URL)
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
  };
});
