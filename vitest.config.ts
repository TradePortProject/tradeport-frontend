import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true, // Enables global 'expect', 'describe', 'it', etc.
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts", // Setup file for jest-dom matchers
  },
});
