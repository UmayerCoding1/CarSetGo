import { Router } from "express";
import { saveCar, getSavedCars, unsaveCar } from "../controllers/savecar.controller.js";
import  verifyUser  from "../middlewares/verify.user.js";
const router = Router();


router.post("/save-car",verifyUser, saveCar);
router.get("/saved-cars/:userId",verifyUser, getSavedCars);
router.delete("/unsave-car",verifyUser, unsaveCar);


export default router;

