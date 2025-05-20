import { Router } from "express";
import { createPricingPlan, getAllPricingPlans, getFreePlan } from "../controllers/pricingPlan.controller.js";
import verifyUser from "../middlewares/verify.user.js";
import verifyAdmin from "../middlewares/verify.admin.js";
const router = Router();

router.post("/create-pricing-plan",verifyUser, verifyAdmin, createPricingPlan);
router.post("/get-free-plan",verifyUser, getFreePlan);
router.get("/get-all-pricing-plans", getAllPricingPlans);

export default router;
