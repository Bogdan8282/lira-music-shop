import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, profilePicture } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, profilePicture });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, 'your_jwt_secret', { expiresIn: '1d' });
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Invalid credentials");

    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

export default router;
