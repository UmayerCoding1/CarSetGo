
export const createCarBookingPayment = async (req, res) => {
  const { bookingId, amount, currency } = req.body;

  try {
    const booking = await Booking.findById(bookingId).populate("carId");
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // STEP 1: Set initial booking status to 'pending'
    await Booking.findByIdAndUpdate(bookingId, {
      paymentStatus: "pending",
    });

    // STEP 2: Create stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            unit_amount: amount * 100,
            product_data: {
              name: "Car Booking Payment",
              description: `Booking for ${booking.carId.make} ${booking.carId.model}, from ${booking.pickupLocation}`,
              images: [booking.carId.images[0]],
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:5173/my-booking?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/my-booking?canceled=true`,
    });

    // STEP 3: Save payment record in DB
    await Payment.create({
      userId: booking.userId,
      bookingId,
      amount,
      transactionId: session.id,
      paymentType: "booking",
      status: "pending", // optional but good
    });

    // STEP 4: Update booking with session ID
    await Booking.findByIdAndUpdate(bookingId, {
      paymentId: session.id,
    });

    // STEP 5: Send session ID to frontend
    res.status(201).json({
      success: true,
      message: "Stripe session created",
      sessionId: session.id,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};










// my-booking.jsx (React)
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MyBooking = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const canceled = params.get("canceled");

    if (canceled) {
      // Optional: Call backend to cancel booking or notify user
      alert("Payment was canceled. Please try again.");
    }
  }, [location.search]);

  return (
    <div>
      {/* your UI */}
    </div>
  );
};
