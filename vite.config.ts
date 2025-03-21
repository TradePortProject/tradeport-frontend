import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
  },
  server: {
    port: 3001,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    coverage: {
      provider: "v8", // Use V8 (C8) for coverage
      reporter: ["text", "json", "html"], // Generates text, JSON, and HTML reports
      exclude: [
        "node_modules/",
        "tests/setup.ts",
        "src/config/**",
        "src/routes/**",
        "src/pages/static/**",
        "src/posts/static/**",
      ], // Exclude unnecessary files
    },
  },
});
