import stripe from "../utils/stripe.js";
import razorpay from "../utils/razorpay.js";
import Tour from "../models/Tour.js";
import Booking from "../models/Booking.js";

// ⭐ STRIPE PAYMENT INTENT ⭐
export const createStripePayment = async (req, res) => {
  try {
    const { tourId, travelers, date } = req.body;

    const tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    const amount = tour.price * travelers * 100;

    const booking = await Booking.create({
      user: req.user._id,
      tour: tourId,
      travelers,
      date,
      totalAmount: amount / 100,
      status: "pending"
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: process.env.CURRENCY,
      metadata: { bookingId: booking._id.toString() }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      bookingId: booking._id
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ⭐ RAZORPAY ORDER ⭐
export const createRazorpayOrder = async (req, res) => {
  try {
    const { tourId, travelers, date } = req.body;

    const tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    const amount = tour.price * travelers * 100;

    const booking = await Booking.create({
      user: req.user._id,
      tour: tourId,
      travelers,
      date,
      totalAmount: amount / 100,
      status: "pending"
    });

    const options = {
      amount,
      currency: "INR",
      receipt: `receipt_${booking._id}`
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      bookingId: booking._id,
      amount,
      currency: "INR"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
