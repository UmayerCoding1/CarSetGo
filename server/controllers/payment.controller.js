import { Booking } from "../models/booking.model.js";
import {Payment}  from "../models/payment.model.js";
import {PricingPlan}  from "../models/pricing.model.js";
import {User} from "../models/user.model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

export const createCarBuyPayment = async (req, res) => {};
export const createPlanPayment = async (req, res) => {
  const { plan, transactionId, userId, amount, date } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const payment = await Payment.create({
      userId,
      paymentType: plan,
      transactionId,
      amount,
      date,
    });

    if(payment){
        const priging = PricingPlan.findOne({name: plan});
        const planDetails = priging.features;
        const updatedUser = await User.findByIdAndUpdate(userId, {
            paymentstatus: 'completed',
            planDetails: {
                plan,
                ...planDetails,
                startDate: date,
                endDate: new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000),
            }
        })

        if(updatedUser){
            res.status(201).json({
                success: true,
                message: "Payment created successfully",
            });
        }
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
