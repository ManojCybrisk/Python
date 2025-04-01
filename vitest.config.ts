// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,  // Allows global test functions like `test`, `expect`
    environment: "jsdom",  // Sets up the environment for DOM testing
    include: ["src/**/*.test.tsx"],  // Ensures Vitest picks up the test files
  },
});

