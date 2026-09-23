import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  database: {
    name: "semmozhi_workshop_os",
    owner: "postgres",
  },
  branches: {
    production: {
      protection: "require_approval",
    },
  },
});
