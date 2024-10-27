import { execSync } from "node:child_process";
import path from "node:path";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vitePluginFaviconsInject from "vite-plugin-favicons-inject";

const GIT_BRANCH =
  process.env.CF_PAGES_BRANCH ||
  execSync("git rev-parse --abbrev-ref HEAD").toString().trim();

const GIT_SHA =
  process.env.CF_PAGES_COMMIT_SHA ||
  execSync("git rev-parse HEAD").toString().trim();

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    TanStackRouterVite(),
    vitePluginFaviconsInject(
      path.resolve(__dirname, "public", "icon-white.svg"),
      {
        appName: "Rivet Hub",
        theme_color: "#ff4f00",
      },
    ),
    process.env.SENTRY_AUTH_TOKEN
      ? sentryVitePlugin({
          org: "rivet-gaming",
          project: "hub",
          authToken: process.env.SENTRY_AUTH_TOKEN,
          release: GIT_BRANCH === "main" ? { name: GIT_SHA } : undefined,
        })
      : null,
  ],
  server: {
    port: 5080,
  },
  define: {
    __APP_GIT_BRANCH__: JSON.stringify(GIT_BRANCH),
    __APP_GIT_COMMIT__: JSON.stringify(GIT_SHA),
    __APP_RIVET_NAMESPACE__: JSON.stringify(process.env.CF_PAGES_BRANCH),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    commonjsOptions: {
      include: [/@rivet-gg\/components/, /node_modules/],
    },
  },
});
