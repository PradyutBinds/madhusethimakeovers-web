import { Router, type IRouter } from "express";
import healthRouter from "./health";
import appointmentsRouter from "./appointments";
import servicesRouter from "./services";
import testimonialsRouter from "./testimonials";
import galleryRouter from "./gallery";
import messagesRouter from "./messages";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(appointmentsRouter);
router.use(servicesRouter);
router.use(testimonialsRouter);
router.use(galleryRouter);
router.use(messagesRouter);
router.use(dashboardRouter);

export default router;
