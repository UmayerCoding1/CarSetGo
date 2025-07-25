import { Router } from "express";
import { checkExistingBookings, createBooking, deleteBooking, getAllBookings, getBookings, getBookingsBySeller,  updateBookingDetails, updateBookingStatus } from "../controllers/booking.controller.js";
import verifyUser from "../middlewares/verify.user.js";
import verifySeller from "../middlewares/verify.seller.js";
import verifyAdmin from "../middlewares/verify.admin.js";
const router = Router();

router.post("/create-booking",verifyUser, createBooking);
router.get("/check-bookings",verifyUser, checkExistingBookings);
router.get("/get-all-bookings",verifyUser,verifyAdmin, getAllBookings);
router.get("/get-bookings/:userId",verifyUser, getBookings);
router.get("/bookings/seller/:sellerId",verifyUser , verifySeller, getBookingsBySeller);
router.put("/update-booking/:bookingId",verifyUser, verifySeller, updateBookingDetails);
router.put('/bookings/:bookingId/status', verifyUser, verifySeller, updateBookingStatus);
router.delete("/delete-booking/:bookingId",verifyUser, deleteBooking);

export default router;
