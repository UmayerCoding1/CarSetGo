import { Booking } from "../models/booking.model.js";
import { Car } from "../models/car.model.js";
import { Dealership } from "../models/dealership.model.js";
import { Payment } from "../models/payment.model.js";
import { PricingPlan } from "../models/pricing.model.js";
import { User } from "../models/user.model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCarBookingPayment = async (req, res) => {
  const { bookingId, amount, currency } = req.body;

  // Input validation
  if (!bookingId || !amount || !currency) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: bookingId, amount, or currency",
    });
  }

  if (amount <= 0) {
    return res.status(400).json({
      success: false,
      message: "Amount must be greater than 0",
    });
  }

  try {
    const booking = await Booking.findById(bookingId).populate("carId");
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check if booking is already paid
    if (booking.paymentStatus === "success") {
      return res.status(400).json({
        success: false,
        message: "Booking is already paid",
      });
    }

    // Set initial booking status to 'pending'
    await Booking.findByIdAndUpdate(bookingId, {
      paymentStatus: "pending",
    });

    // STEP 2: Create stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
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
      mode: "payment",
      success_url: `http://localhost:5173/my-booking?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/my-booking?canceled=true&session_id={CHECKOUT_SESSION_ID}`,
    });

    // STEP 3: Save payment record in DB
    const payment = await Payment.create({
      userId: booking.userId,
      bookingId,
      amount,
      transactionId: session.id,
      paymentType: "booking",
      status: "pending", // optional but good
    });

    booking.paymentId = session.id;
    await booking.save();

    // STEP 5: Send session ID to frontend
    res.status(201).json({
      success: true,
      message: "Stripe session created",
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create payment session",
    });
  }
};

export const createCarBuyPayment = async (req, res) => {
  const { carId, amount, currency } = req.body;

  try {
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            unit_amount: amount * 100,
            product_data: {
              name: `${car.make} ${car.model}`,
              description: car.description,
              images: [car.images[0]],
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/my-cars/${req.userId}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/my-cars/${req.userId}?canceled=true&session_id={CHECKOUT_SESSION_ID}`,
    });

    if (!session) {
      return res.status(400).json({
        success: false,
        message: "Failed to create stripe session",
      });
    }

    if (session.id) {
      const payment = await Payment.create({
        userId: req.userId,
        carId,
        amount,
        transactionId: session.id,
        paymentType: "buying",
      });
    }

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


export const createPlanPayment = async (req, res) => {
  const { planName, price, currency } = req.body;
  const userId = req.userId;
  const amount = price * 100;

  if(!planName || !price || !currency ){
    return res.status(404).json({message: 'All field is requrid', success: false})
  }
  try {
    const plan =await PricingPlan.findOne({name: planName});
    if(!plan){
      return res.status(404).json({message: "This plan is not found", success: false})
    }


   const session = await stripe.checkout.sessions.create({
     payment_method_types: ["card"],
     line_items: [
      {
          price_data: {
            currency,
            unit_amount: amount,
            product_data: {
              name: plan.name,
            },
          },
          quantity: 1,
      }
     ],
     mode: "payment",
     success_url: `http://localhost:5173/seller-dashboard?success=true&planName=${planName}&session_id={CHECKOUT_SESSION_ID}`,
     cancel_url: `http://localhost:5173/seller-dashboard?canceled=true&&planName=${planName}$session_id={CHECKOUT_SESSION_ID}`,
   });

   if(!session){
    return res.status(400).json({
      success: false,
      message: "Failed to create stripe session",
    });
   }

   if(session.id){
    const payment = await Payment.create({
      userId: userId,
      amount,
      transactionId: session.id,
      paymentType: 'plan'
    })
   }

   res.status(201).json({
    success: true,
    message: "Stripe session created",
    sessionId: session.id,
  });
    
  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const handlePaymentSuccess = async (req, res) => {
  const { sessionId } = req.body;
  const planName = req.query.planName;
  console.log(planName);

  if (!sessionId || !planName) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: sessionId or planName",
    });
  }


  try {
    const existingPayment = await Payment.findOne({ transactionId: sessionId });
    if (!existingPayment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    console.log(existingPayment);
    

    if (existingPayment.paymentType === "booking") {
      const booking = await Booking.findByIdAndUpdate(
        existingPayment.bookingId,
        {
          status: "processing",
          paymentStatus: "success",
        }
      );

      if (booking) {
        return res.status(200).json({
          success: true,
          message: "Payment success",
        });
      }
    }

    if (existingPayment.paymentType === "buying") {
      const dealership = await Dealership.findOneAndUpdate(
        { carId: existingPayment.carId },
        {
          $set: {
            "paymentInfo.paymentId": existingPayment._id,
            "paymentInfo.paymentDate": new Date().toLocaleDateString(),
            "paymentInfo.paymentAmount": existingPayment.amount,
            "paymentInfo.paymentStatus": "success",
          },
        }
      );

    
      if (dealership) {
        return res.status(200).json({
          success: true,
          message: "Payment success",
        });
      }
    }


    if(existingPayment.paymentType === 'plan'){
      const plan = await PricingPlan.findOne({name: planName});
      if(!plan){
        return res.status(404).json({message: "This plan is not found", success: false})
      }
      const user = await User.findByIdAndUpdate(
        existingPayment.userId,
        {
          $set: {
            'isPlanActive': true,
            "plan": plan.name,
            "planDetails": plan._id,
          }

        },
        {new: true}
      )
      if(user){
        return res.status(200).json({
          success: true,
          message: "Payment success",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const handlePaymentCancel = async (req, res) => {
  const { sessionId } = req.body;
  try {
    const existingPayment = await Payment.findOne({ transactionId: sessionId });
    if (!existingPayment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    const booking = await Booking.findByIdAndUpdate(existingPayment.bookingId, {
      paymentStatus: "failed",
    });

    if (booking) {
      await Payment.findByIdAndDelete(existingPayment._id);
    }

    res.status(200).json({
      success: true,
      message: "Payment canceled",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


