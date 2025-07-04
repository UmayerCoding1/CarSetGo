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

    //Get last 6 months revenue
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

    // Get user distribution
    let userData = [];
    const normalUser = users.filter((user) => user.role === "user");
    const seller = users.filter((user) => user.role === "seller");
    userData.push(normalUser.length);
    userData.push(seller.length);

    //  Get top car in thsi month
    let maxCount = 5;
    const currentMonthBooking = await Booking.find({
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
      },
    });

    const carId = currentMonthBooking.map((item) => item.carId);

    const countMap = new Map();

    for (const id of carId) {
      const idStr = id.toString();
      if (countMap.has(idStr)) {
        countMap.set(idStr, countMap.get(idStr) + 1);
      } else {
        countMap.set(idStr, 1);
      }
    }

    const countedCarIds = Array.from(countMap.entries()).map(
      ([carId, count]) => ({
        carId,
        count,
      })
    );

    const topCars = await Promise.all(
      countedCarIds.map(async (c) => {
        const car = await Car.findById(c.carId).select(
          "-year -price -mileage -color -fuelType -transmission -bodyType -seats -description -status -featured -bookingBy -dealership -seller -category -postType -paymentsystem -addCredits -availableCar -views -createdAt -updatedAt"
        );
        return {
          car,
          count: c.count,
        };
      })
    );

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
      userDistribution: userData,
      topCars,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const getUserProfileAnalytics = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.query;

    if (role === "user") {
      const user = await User.findById(id).select("-password  -updatedAt");
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }


      const bookings = await Booking.find({userId: id});
      const reviews = await Review.find({userId: id});
      const reports = await Report.find({userId: id}) 
    }

    if (role === "seller") {
      const seller = await User.findById(id).select("-password  -updatedAt");
      if (!seller) {
        return res
          .status(404)
          .json({ message: "Seller not found", success: false });
      }

      const cars = await Car.find({ seller: id }).populate("seller");
      const bookings = await Booking.find({ sellerId: id });
      const reviews = await Review.find({ sellerId: id });
      const payments = await Payment.find({ sellerId: id });
      const reports = await Report.find({ sellerId: id });

      const totalPaymentAmount = payments.reduce(
        (total, payment) => total + payment.amount,
        0
      );

      return res.status(200).json({
        seller,
        analytics: {
          totalCars: cars.length,
          totalBookings: bookings.length,
          totalReviews: reviews.length,
          totalPayments: totalPaymentAmount,
          totalReports: reports.length,
        },
        reviews,
        reports,
        success: true,
      });
    }
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
