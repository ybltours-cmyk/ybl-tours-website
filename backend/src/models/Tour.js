import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    text: true
  },
  description: {
    type: String,
    required: true,
    text: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: Number, // days
    required: true
  },
  location: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    default: []
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
