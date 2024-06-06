import { execSync } from "node:child_process";
import path from "node:path";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  server: {
    port: 5080,
  },
  define: {
    __APP_GIT_BRANCH__: JSON.stringify(
      process.env.CF_PAGES_BRANCH ||
        execSync("git rev-parse --abbrev-ref HEAD").toString().trim(),
    ),
    __APP_GIT_COMMIT__: JSON.stringify(
      process.env.CF_PAGES_COMMIT_SHA ||
        execSync("git rev-parse HEAD").toString().trim(),
    ),
    __APP_RIVET_NAMESPACE__: JSON.stringify(process.env.CF_PAGES_BRANCH),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    commonjsOptions: {
      include: [/@rivet-gg\/components/, /node_modules/],
    },
  },
});
