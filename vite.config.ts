// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",  // Ensure jsdom is the testing environment
    include: ["src/**/*.test.tsx"], // Or adjust this pattern as needed
  },
});
