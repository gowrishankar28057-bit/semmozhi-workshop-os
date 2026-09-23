import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    exclude: ["tests/e2e/**", "node_modules/**", ".next/**"],
    coverage: { reporter: ["text", "html"] },
  },
  resolve: {
    alias: [{ find: /^@\//, replacement: `${path.resolve(__dirname, ".")}/` }],
  },
});
