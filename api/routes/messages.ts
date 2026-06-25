import { Router } from "express";
import { db, messagesTable } from "../../src/server/db.js";
import { eq, desc } from "drizzle-orm";
import { CreateMessageBody, UpdateMessageBody } from "../../src/server/validation.js";

const router = Router();

router.get("/messages", async (req, res) => {
  try {
    const read = req.query.read === "true" ? true : req.query.read === "false" ? false : undefined;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;

    let rows = await db.select().from(messagesTable).orderBy(desc(messagesTable.createdAt));

    if (read !== undefined) {
      rows = rows.filter((m) => m.read === read);
    }

    const paginated = rows.slice(offset, offset + limit);

    res.json(
      paginated.map((m) => ({
        id: m.id,
        name: m.name,
        phone: m.phone ?? null,
        email: m.email,
        subject: m.subject ?? null,
        message: m.message,
        read: m.read,
        createdAt: m.createdAt.toISOString(),
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Failed to list messages");
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

router.post("/messages", async (req, res) => {
  try {
    const parsed = CreateMessageBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Validation failed", details: parsed.error.issues });
    }
    const data = parsed.data;
    const [msg] = await db
      .insert(messagesTable)
      .values({
        name: data.name,
        phone: data.phone ?? null,
        email: data.email,
        subject: data.subject ?? null,
        message: data.message,
        read: false,
      })
      .returning();

    res.status(201).json({
      id: msg.id,
      name: msg.name,
      phone: msg.phone ?? null,
      email: msg.email,
      subject: msg.subject ?? null,
      message: msg.message,
      read: msg.read,
      createdAt: msg.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create message");
    res.status(500).json({ error: "Failed to submit message" });
  }
});

router.patch("/messages/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const parsed = UpdateMessageBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Validation failed", details: parsed.error.issues });
    }

    const updates: Record<string, unknown> = {};
    if (parsed.data.read !== undefined) updates.read = parsed.data.read;

    const [updated] = await db.update(messagesTable).set(updates).where(eq(messagesTable.id, id)).returning();
    if (!updated) return res.status(404).json({ error: "Message not found" });

    res.json({
      id: updated.id,
      name: updated.name,
      phone: updated.phone ?? null,
      email: updated.email,
      subject: updated.subject ?? null,
      message: updated.message,
      read: updated.read,
      createdAt: updated.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to update message");
    res.status(500).json({ error: "Failed to update message" });
  }
});

router.delete("/messages/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
    await db.delete(messagesTable).where(eq(messagesTable.id, id));
    res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete message");
    res.status(500).json({ error: "Failed to delete message" });
  }
});

export default router;
