import { Router } from "express";
import { clearDealership, createDealership, getDealership, getDealershipBySeller } from "../controllers/dealership.controller.js";
import verifyUser from "../middlewares/verify.user.js";
import verifySeller from "../middlewares/verify.seller.js";
const router = Router();

router.post("/create-dealership",verifyUser, createDealership);
router.get("/get-dealership/:userId", verifyUser, getDealership);
router.get("/get-dealership-by-seller", verifyUser, verifySeller, getDealershipBySeller);
router.post("/clear-dealership", verifyUser, clearDealership);

export default router;
