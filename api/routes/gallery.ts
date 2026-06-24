import { Router } from "express";
import { db, galleryTable } from "../../src/server/db.js.js";
import { eq, desc } from "drizzle-orm";
import { CreateGalleryImageBody } from "../../src/server/validation.js";

const router = Router();

router.get("/gallery", async (req, res) => {
  try {
    const category = req.query.category as string | undefined;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = (page - 1) * limit;

    let rows = await db.select().from(galleryTable).orderBy(desc(galleryTable.createdAt));

    if (category) {
      rows = rows.filter((g) => g.category === category);
    }

    const paginated = rows.slice(offset, offset + limit);

    res.json(
      paginated.map((g) => ({
        id: g.id,
        imageUrl: g.imageUrl,
        altText: g.altText ?? null,
        category: g.category,
        featured: g.featured,
        createdAt: g.createdAt.toISOString(),
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Failed to list gallery");
    res.status(500).json({ error: "Failed to fetch gallery" });
  }
});

router.post("/gallery", async (req, res) => {
  try {
    const parsed = CreateGalleryImageBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Validation failed", details: parsed.error.issues });
    }
    const data = parsed.data;
    const [image] = await db
      .insert(galleryTable)
      .values({
        imageUrl: data.imageUrl,
        altText: data.altText ?? null,
        category: data.category,
        featured: data.featured ?? false,
      })
      .returning();

    res.status(201).json({
      id: image.id,
      imageUrl: image.imageUrl,
      altText: image.altText ?? null,
      category: image.category,
      featured: image.featured,
      createdAt: image.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to add gallery image");
    res.status(500).json({ error: "Failed to add image" });
  }
});

router.delete("/gallery/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
    await db.delete(galleryTable).where(eq(galleryTable.id, id));
    res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete gallery image");
    res.status(500).json({ error: "Failed to delete image" });
  }
});

export default router;
