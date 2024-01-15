import path from "path";
import { defineConfig } from "vite";
export default defineConfig({
  base: "/Habitforge",
  root: "./src",
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    },
  },
});