import Tour from "../models/Tour.js";

export const markFeatured = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      { isFeatured: true },
      { new: true }
    );
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unmarkFeatured = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      { isFeatured: false },
      { new: true }
    );
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
