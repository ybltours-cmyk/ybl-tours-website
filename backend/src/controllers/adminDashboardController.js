import Booking from "../models/Booking.js";
import Tour from "../models/Tour.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTours = await Tour.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalRevenue = await Booking.aggregate([
      { $match: { status: "confirmed" } },
      { $group: { _id: null, revenue: { $sum: "$totalAmount" } } }
    ]);

    res.json({
      totalUsers,
      totalTours,
      totalBookings,
      totalRevenue: totalRevenue[0]?.revenue || 0
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Monthly revenue analytics
export const getMonthlyRevenue = async (req, res) => {
  try {
    const data = await Booking.aggregate([
      {
        $match: { status: "confirmed" }
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
          revenue: { $sum: "$totalAmount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } }
    ]);

    res.json(data);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
