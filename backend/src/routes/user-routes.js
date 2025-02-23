import express from "express";
import mongoose from "mongoose";
import User from "../schemas/user-schema.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const user_id = req.params.id;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // Send user data as response
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
