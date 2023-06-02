import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths({ root: "../../" })],
  server: {
    fs: {
      allow: ["../../"],
    },
  },
  preview: {
    headers: {
      "Cache-Control": "public, max-age=600",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // ew
        additionalData: `@use "../../packages/shoppa-ui/styles/abstracts" as *;`,
      },
    },
  },
});
