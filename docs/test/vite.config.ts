import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "hook.ts",
      name: "useFloating",
      fileName: "floating",
    },
    // rollupOptions: {
    //   external: ["react", "react-dom", "@floating-ui/react"],
    //   output: {
    //     format: "amd",
    //   },
    // },
  },
});
