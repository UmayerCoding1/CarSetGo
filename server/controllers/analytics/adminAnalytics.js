import { Booking } from "../../models/booking.model.js";
import { Car } from "../../models/car.model.js";
import { Payment } from "../../models/payment.model.js";
import { Report } from "../../models/reports.model.js";
import { Review } from "../../models/review.model.js";
import { TrackPlatform } from "../../models/trackPlatform.model.js";
import { User } from "../../models/user.model.js";

export const getAdminAnalyticsState = async (req, res) => {
  const isAdmin = req.isAdmin;
  if (!isAdmin)
    return res.status(403).json({ message: "Access denied. Admins only." });

  try {
    // find total use platform
    const platforms = await TrackPlatform.find();
    const web = platforms.filter((platform) => platform.platform === "Web");
    const mobile = platforms.filter(
      (platform) => platform.platform === "Mobile"
    );
    const totalPlatform = web.length + mobile.length;
    const webPercentage = parseInt((web.length / totalPlatform) * 100);
    const MobilePercentage = parseInt((mobile.length / totalPlatform) * 100);
    const trackPlatformData = { web: webPercentage, mobile: MobilePercentage };

    // total analytics
    const users = await User.find();
    const cars = await Car.find();
    const bookings = await Booking.find();
    const reviews = await Review.find();
    const reports = await Report.find();

    // last 6 months revenue
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const previousMonths = [];
    const baseDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    for (let i = 6; i >= 1; i--) {
      const tempDate = new Date(baseDate);
      tempDate.setMonth(tempDate.getMonth() - i);

      previousMonths.push({
        month: tempDate.getMonth() + 1,
        year: tempDate.getFullYear(),
        label: `${months[tempDate.getMonth()].slice(0, 3)}`,
      });
    }

    // get previoes month payments
    const monthlyPayments = await Payment.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
        },
      },

      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    const paymentMap = new Map();
    monthlyPayments.forEach((item) => {
      const key = `${item._id.month}-${item._id.year}`;
      paymentMap.set(key, {
        totalAmount: item.totalAmount,
      });
    });

    const sixMonthRevenue = previousMonths.map((m) => {
      const key = `${m.month}-${m.year}`;
      const data = paymentMap.get(key);
      return {
        month: m.label,
        totalAmount: data?.totalAmount || 0,
      };
    });

    const monthName = sixMonthRevenue.map((item) => item.month);
    const monthlyPayment = sixMonthRevenue.map((item) => item.totalAmount);

    return res.status(200).json({
      platform: trackPlatformData,
      totalUser: users.length,
      totalCars: cars.length,
      totalBooking: bookings.length,
      totalReview: reviews.length,
      totalReport: reports.length,
      prevSixMonthRevenue: {
        monthName,
        monthlyPayment,
      },
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const trackPlatform = async (req, res) => {
  const { platform } = req.body;
  try {
    const result = await TrackPlatform.create({ platform });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
