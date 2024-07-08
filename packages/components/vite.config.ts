import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: "src", insertTypesEntry: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        "tailwind-base": path.resolve(__dirname, "src/tailwind-base.ts"),
        header: path.resolve(__dirname, "src/header/index.tsx"),
        layout: path.resolve(__dirname, "src/layout/index.ts"),
      },
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "react-hook-form",
        "zod",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-brands-svg-icons",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/pro-regular-svg-icons",
        "@fortawesome/pro-solid-svg-icons",
        "@fortawesome/react-fontawesome",
        "@rivet-gg/api",
      ],
    },
  },
});
