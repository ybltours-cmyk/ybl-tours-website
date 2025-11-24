import Booking from "../models/Booking.js";

export const confirmPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "confirmed";
    await booking.save();

    res.json({ message: "Payment confirmed", booking });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
