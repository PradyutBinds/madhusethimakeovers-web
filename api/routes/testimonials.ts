import { Router } from "express";
import { db, testimonialsTable } from "../../src/server/db.js.js";
import { eq, desc } from "drizzle-orm";
import { CreateTestimonialBody, UpdateTestimonialBody } from "../../src/server/validation.js.js";

const router = Router();

router.get("/testimonials", async (req, res) => {
  try {
    const featured = req.query.featured === "true" ? true : req.query.featured === "false" ? false : undefined;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = (page - 1) * limit;

    let rows = await db.select().from(testimonialsTable).orderBy(desc(testimonialsTable.createdAt));

    if (featured !== undefined) {
      rows = rows.filter((t) => t.featured === featured);
    }

    const paginated = rows.slice(offset, offset + limit);

    res.json(
      paginated.map((t) => ({
        id: t.id,
        clientName: t.clientName,
        serviceType: t.serviceType ?? null,
        rating: t.rating,
        review: t.review,
        imageUrl: t.imageUrl ?? null,
        featured: t.featured,
        createdAt: t.createdAt.toISOString(),
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Failed to list testimonials");
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
});

router.post("/testimonials", async (req, res) => {
  try {
    const parsed = CreateTestimonialBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Validation failed", details: parsed.error.issues });
    }
    const data = parsed.data;
    const [testimonial] = await db
      .insert(testimonialsTable)
      .values({
        clientName: data.clientName,
        serviceType: data.serviceType ?? null,
        rating: data.rating,
        review: data.review,
        imageUrl: data.imageUrl ?? null,
        featured: data.featured ?? false,
      })
      .returning();

    res.status(201).json({
      id: testimonial.id,
      clientName: testimonial.clientName,
      serviceType: testimonial.serviceType ?? null,
      rating: testimonial.rating,
      review: testimonial.review,
      imageUrl: testimonial.imageUrl ?? null,
      featured: testimonial.featured,
      createdAt: testimonial.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create testimonial");
    res.status(500).json({ error: "Failed to create testimonial" });
  }
});

router.patch("/testimonials/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const parsed = UpdateTestimonialBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Validation failed", details: parsed.error.issues });
    }

    const updates: Record<string, unknown> = {};
    const d = parsed.data;
    if (d.clientName !== undefined) updates.clientName = d.clientName;
    if (d.serviceType !== undefined) updates.serviceType = d.serviceType;
    if (d.rating !== undefined) updates.rating = d.rating;
    if (d.review !== undefined) updates.review = d.review;
    if (d.imageUrl !== undefined) updates.imageUrl = d.imageUrl;
    if (d.featured !== undefined) updates.featured = d.featured;

    const [updated] = await db.update(testimonialsTable).set(updates).where(eq(testimonialsTable.id, id)).returning();
    if (!updated) return res.status(404).json({ error: "Testimonial not found" });

    res.json({
      id: updated.id,
      clientName: updated.clientName,
      serviceType: updated.serviceType ?? null,
      rating: updated.rating,
      review: updated.review,
      imageUrl: updated.imageUrl ?? null,
      featured: updated.featured,
      createdAt: updated.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to update testimonial");
    res.status(500).json({ error: "Failed to update testimonial" });
  }
});

router.delete("/testimonials/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
    await db.delete(testimonialsTable).where(eq(testimonialsTable.id, id));
    res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete testimonial");
    res.status(500).json({ error: "Failed to delete testimonial" });
  }
});

export default router;
