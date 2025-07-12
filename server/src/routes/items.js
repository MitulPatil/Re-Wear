import express from "express";
import multer from "multer";
import Item from "../models/item.js";
import auth from "../middleware/auth.js";
import path from "path";
import fs from "fs";

const router = express.Router();

// Ensure the images directory exists
const imagesDir = "/Users/omkumarparmar/Downloads/project/images";
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

// Configure Multer to use the images folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.post("/upload-image", upload.single("file"), (req, res) => {
  // Return the relative path to the image
  const filePath = `/images/${req.file.filename}`;
  res.json({ url: filePath });
});

router.post("/", auth, async (req, res) => {
  const { title, description, imageUrl } = req.body;
  const item = new Item({ title, description, imageUrl, owner: req.user.id });
  await item.save();
  res.json(item);
});

router.get("/", async (req, res) => {
  const items = await Item.find().populate("owner", "email");
  res.json(items);
});

export default router;
