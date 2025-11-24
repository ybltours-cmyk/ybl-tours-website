import Destination from "../models/Destination.js";

export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body);
    res.json(destination);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
