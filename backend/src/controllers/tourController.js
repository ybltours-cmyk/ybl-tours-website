import Tour from "../models/Tour.js";

// Create a new tour (Admin)
export const createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tours with filtering & search
export const getTours = async (req, res) => {
  try {
    const { search, location, minPrice, maxPrice, duration, page = 1, limit = 10 } = req.query;

    let query = {};

    // Search by text (title + description)
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by location
    if (location) {
      query.location = location;
    }

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Filter by duration
    if (duration) {
      query.duration = duration;
    }

    const skip = (page - 1) * limit;

    const tours = await Tour.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single tour by ID
export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a tour (Admin)
export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!tour) return res.status(404).json({ message: "Tour not found" });

    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a tour (Admin)
export const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) return res.status(404).json({ message: "Tour not found" });

    res.json({ message: "Tour deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
