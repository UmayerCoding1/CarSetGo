import { Router } from "express";
import { clearDealership, createDealership, getDealership, getDealershipBySeller, rejectedDealershipRequest } from "../controllers/dealership.controller.js";
import verifyUser from "../middlewares/verify.user.js";
import verifySeller from "../middlewares/verify.seller.js";
const router = Router();

router.post("/dealership",verifyUser, createDealership);
router.get("/dealership/:userId", verifyUser, getDealership);
router.get("/dealership/seller/:sellerId", verifyUser, verifySeller, getDealershipBySeller);
router.put("/clear-dealership", verifyUser, clearDealership);
router.put('/dealership/rejected', verifyUser,verifySeller,rejectedDealershipRequest);

export default router;
