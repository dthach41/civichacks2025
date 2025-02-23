import express from "express";
import User from "../schemas/user-schema.js";

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { name, email, password, job_seeking } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, job_seeking });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        job_seeking: user.job_seeking,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({ message: "Login successful", user: user });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

export default router;
