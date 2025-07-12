import express from "express";
import User from "../models/user.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

export default router;
