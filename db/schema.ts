// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const studioPages = sqliteTable("studio_pages", {
  slug: text("slug").primaryKey(),
  draft: text("draft").notNull(),
  published: text("published"),
  revision: integer("revision").notNull().default(1),
  updated: text("updated").notNull(),
});
