import express from "express";
import Place from "../models/Place.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/places", authMiddleware, async (req, res) => {
  const { name, address, email } = req.body;
  try {
    const newPlace = new Place({
      name,
      address,
      email,
      author: req.user._id,
    });
    await newPlace.save();
    res.status(201).json(newPlace);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/places/:id", authMiddleware, async (req, res) => {
  const { name, address, email } = req.body;
  try {
    const updated = await Place.findByIdAndUpdate(
      req.params.id,
      { name, address, email },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/places/:id", authMiddleware, async (req, res) => {
  try {
    await Place.findByIdAndDelete(req.params.id);
    res.json({ message: "Place deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/places", async (req, res) => {
  const searchQuery = req.query.q;
  try {
    let places;
    if (searchQuery) {
      places = await Place.find({
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { address: { $regex: searchQuery, $options: "i" } },
        ],
      });
    } else {
      places = await Place.find();
    }
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;