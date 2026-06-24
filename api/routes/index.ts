import { Router, type IRouter } from "express";

import healthRouter from "./health.js";
import appointmentsRouter from "./appointments.js";
import servicesRouter from "./services.js";
import testimonialsRouter from "./testimonials.js";
import galleryRouter from "./gallery.js";
import messagesRouter from "./messages.js";
import dashboardRouter from "./dashboard.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(appointmentsRouter);
router.use(servicesRouter);
router.use(testimonialsRouter);
router.use(galleryRouter);
router.use(messagesRouter);
router.use(dashboardRouter);

export default router;
