import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const galleryTable = pgTable("gallery", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  altText: text("alt_text"),
  category: text("category").notNull(),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertGallerySchema = createInsertSchema(galleryTable).omit({ id: true, createdAt: true });
export type InsertGallery = z.infer<typeof insertGallerySchema>;
export type GalleryImage = typeof galleryTable.$inferSelect;
