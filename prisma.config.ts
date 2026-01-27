import { defineConfig } from "prisma/config";

export default defineConfig({
  migrate: {
    datasource: "db",
  },
  db: {
    url: process.env.DATABASE_URL,
  },
});
