import { Router } from "express";
import { db, servicesTable } from "../../src/server/db.js";
import { eq, asc } from "drizzle-orm";
import { CreateServiceBody, UpdateServiceBody } from "../../src/server/validation.js";

const router = Router();

router.get("/services", async (req, res) => {
  try {
    const category = req.query.category as string | undefined;
    let rows = await db.select().from(servicesTable).orderBy(asc(servicesTable.sortOrder));

    if (category) {
      rows = rows.filter((s) => s.category === category);
    }

    res.json(
      rows.map((s) => ({
        id: s.id,
        name: s.name,
        category: s.category,
        description: s.description,
        price: s.price ?? null,
        duration: s.duration,
        imageUrl: s.imageUrl ?? null,
        featured: s.featured,
        sortOrder: s.sortOrder,
        createdAt: s.createdAt.toISOString(),
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Failed to list services");
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

router.post("/services", async (req, res) => {
  try {
    const parsed = CreateServiceBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Validation failed", details: parsed.error.issues });
    }
    const data = parsed.data;
    const [service] = await db
      .insert(servicesTable)
      .values({
        name: data.name,
        category: data.category,
        description: data.description,
        price: data.price ?? null,
        duration: data.duration,
        imageUrl: data.imageUrl ?? null,
        featured: data.featured ?? false,
        sortOrder: data.sortOrder ?? 0,
      })
      .returning();

    res.status(201).json({
      id: service.id,
      name: service.name,
      category: service.category,
      description: service.description,
      price: service.price ?? null,
      duration: service.duration,
      imageUrl: service.imageUrl ?? null,
      featured: service.featured,
      sortOrder: service.sortOrder,
      createdAt: service.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create service");
    res.status(500).json({ error: "Failed to create service" });
  }
});

router.patch("/services/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const parsed = UpdateServiceBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Validation failed", details: parsed.error.issues });
    }

    const updates: Record<string, unknown> = {};
    const d = parsed.data;
    if (d.name !== undefined) updates.name = d.name;
    if (d.category !== undefined) updates.category = d.category;
    if (d.description !== undefined) updates.description = d.description;
    if (d.price !== undefined) updates.price = d.price;
    if (d.duration !== undefined) updates.duration = d.duration;
    if (d.imageUrl !== undefined) updates.imageUrl = d.imageUrl;
    if (d.featured !== undefined) updates.featured = d.featured;
    if (d.sortOrder !== undefined) updates.sortOrder = d.sortOrder;

    const [updated] = await db.update(servicesTable).set(updates).where(eq(servicesTable.id, id)).returning();
    if (!updated) return res.status(404).json({ error: "Service not found" });

    res.json({
      id: updated.id,
      name: updated.name,
      category: updated.category,
      description: updated.description,
      price: updated.price ?? null,
      duration: updated.duration,
      imageUrl: updated.imageUrl ?? null,
      featured: updated.featured,
      sortOrder: updated.sortOrder,
      createdAt: updated.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to update service");
    res.status(500).json({ error: "Failed to update service" });
  }
});

router.delete("/services/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
    await db.delete(servicesTable).where(eq(servicesTable.id, id));
    res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete service");
    res.status(500).json({ error: "Failed to delete service" });
  }
});

export default router;
