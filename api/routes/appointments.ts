import { Router } from "express";
import { db, appointmentsTable } from "../../src/server/db.js.js";
import { eq, desc, count } from "drizzle-orm";
import { CreateAppointmentBody, UpdateAppointmentBody, ListAppointmentsQueryParams } from "../../src/server/validation.js";

const router = Router();

router.get("/appointments", async (req, res) => {
  try {
    const parsed = ListAppointmentsQueryParams.safeParse(req.query);
    const params = parsed.success ? parsed.data : {};
    const page = params.page ?? 1;
    const limit = params.limit ?? 20;
    const offset = (page - 1) * limit;

    let query = db.select().from(appointmentsTable).orderBy(desc(appointmentsTable.createdAt));

    let allRows = await db.select().from(appointmentsTable).orderBy(desc(appointmentsTable.createdAt));

    if (params.status) {
      allRows = allRows.filter((a) => a.status === params.status);
    }

    const total = allRows.length;
    const data = allRows.slice(offset, offset + limit).map((a) => ({
      id: a.id,
      name: a.name,
      phone: a.phone,
      email: a.email,
      service: a.service,
      date: a.date,
      time: a.time,
      message: a.message ?? null,
      status: a.status,
      createdAt: a.createdAt.toISOString(),
    }));

    res.json({ data, total, page, limit });
  } catch (err) {
    req.log.error({ err }, "Failed to list appointments");
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

router.post("/appointments", async (req, res) => {
  try {
    const parsed = CreateAppointmentBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Validation failed", details: parsed.error.issues });
    }
    const data = parsed.data;
    const [appointment] = await db
      .insert(appointmentsTable)
      .values({
        name: data.name,
        phone: data.phone,
        email: data.email,
        service: data.service,
        date: data.date,
        time: data.time,
        message: data.message ?? null,
        status: "pending",
      })
      .returning();

    res.status(201).json({
      id: appointment.id,
      name: appointment.name,
      phone: appointment.phone,
      email: appointment.email,
      service: appointment.service,
      date: appointment.date,
      time: appointment.time,
      message: appointment.message ?? null,
      status: appointment.status,
      createdAt: appointment.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create appointment");
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

router.get("/appointments/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const [appointment] = await db.select().from(appointmentsTable).where(eq(appointmentsTable.id, id));
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    res.json({
      id: appointment.id,
      name: appointment.name,
      phone: appointment.phone,
      email: appointment.email,
      service: appointment.service,
      date: appointment.date,
      time: appointment.time,
      message: appointment.message ?? null,
      status: appointment.status,
      createdAt: appointment.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get appointment");
    res.status(500).json({ error: "Failed to fetch appointment" });
  }
});

router.patch("/appointments/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const parsed = UpdateAppointmentBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Validation failed", details: parsed.error.issues });
    }

    const updates: Record<string, unknown> = {};
    if (parsed.data.status !== undefined) updates.status = parsed.data.status;
    if (parsed.data.message !== undefined) updates.message = parsed.data.message;

    const [updated] = await db
      .update(appointmentsTable)
      .set(updates)
      .where(eq(appointmentsTable.id, id))
      .returning();

    if (!updated) return res.status(404).json({ error: "Appointment not found" });

    res.json({
      id: updated.id,
      name: updated.name,
      phone: updated.phone,
      email: updated.email,
      service: updated.service,
      date: updated.date,
      time: updated.time,
      message: updated.message ?? null,
      status: updated.status,
      createdAt: updated.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to update appointment");
    res.status(500).json({ error: "Failed to update appointment" });
  }
});

router.delete("/appointments/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    await db.delete(appointmentsTable).where(eq(appointmentsTable.id, id));
    res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete appointment");
    res.status(500).json({ error: "Failed to delete appointment" });
  }
});

export default router;
