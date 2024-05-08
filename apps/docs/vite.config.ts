import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@rivet-gg/components"],
  },
  build: {
    commonjsOptions: {
      include: [/@rivet-gg\/components/, /node_modules/],
    },
  },
});
