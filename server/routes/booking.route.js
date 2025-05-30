import { Router } from "express";
import { checkExistingBookings, createBooking, deleteBooking, getAllBookings, getBookings, getBookingsBySeller, updateBooking } from "../controllers/booking.controller.js";
import verifyUser from "../middlewares/verify.user.js";
import verifySeller from "../middlewares/verify.seller.js";
import verifyAdmin from "../middlewares/verify.admin.js";
const router = Router();

router.post("/create-booking",verifyUser, createBooking);
router.get("/check-bookings",verifyUser, checkExistingBookings);
router.get("/get-all-bookings",verifyUser,verifyAdmin, getAllBookings);
router.get("/get-bookings/:userId",verifyUser, getBookings);
router.get("/get-bookings-by-seller/:sellerId",verifyUser , verifySeller, getBookingsBySeller);
router.put("/update-booking/:bookingId",verifyUser, verifySeller, updateBooking);
router.delete("/delete-booking/:bookingId",verifyUser, deleteBooking);

export default router;
