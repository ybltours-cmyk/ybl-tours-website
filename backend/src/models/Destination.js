import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  description: String,
  price: Number,
}, { timestamps: true });

export default mongoose.model("Destination", destinationSchema);
