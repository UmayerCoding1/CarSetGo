import exress from "express";
const router = exress.Router();
import { createReport } from "../controllers/report.controller.js";
import verifyUser from "../middlewares/verify.user.js";
router.post("/report",verifyUser, createReport);
export default router;