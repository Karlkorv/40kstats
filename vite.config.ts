import { defineConfig } from "vite";
import reactJsxPlugin from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [reactJsxPlugin()],
  server: {
    port: 8000,
  },
  build: {
    sourcemap: true,
    minify: false,
    outDir: "dist",
  },
});
