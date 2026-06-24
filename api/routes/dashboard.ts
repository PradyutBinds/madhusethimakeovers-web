import { Router } from "express";
import { db, appointmentsTable, messagesTable, testimonialsTable, servicesTable, galleryTable } from "../../src/server/db.js.js";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/dashboard/stats", async (req, res) => {
  try {
    const [appointments, messages, testimonials, services, gallery] = await Promise.all([
      db.select().from(appointmentsTable).orderBy(desc(appointmentsTable.createdAt)),
      db.select().from(messagesTable),
      db.select().from(testimonialsTable),
      db.select().from(servicesTable),
      db.select().from(galleryTable),
    ]);

    const totalAppointments = appointments.length;
    const pendingAppointments = appointments.filter((a) => a.status === "pending").length;
    const confirmedAppointments = appointments.filter((a) => a.status === "confirmed").length;
    const completedAppointments = appointments.filter((a) => a.status === "completed").length;
    const totalMessages = messages.length;
    const unreadMessages = messages.filter((m) => !m.read).length;

    const recentAppointments = appointments.slice(0, 5).map((a) => ({
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

    res.json({
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      completedAppointments,
      totalMessages,
      unreadMessages,
      totalTestimonials: testimonials.length,
      totalServices: services.length,
      totalGalleryImages: gallery.length,
      recentAppointments,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get dashboard stats");
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
