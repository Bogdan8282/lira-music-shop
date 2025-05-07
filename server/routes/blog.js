import express from "express";
import Post from "../models/Post.js";
import authMiddleware from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get("/posts", async (req, res) => {
  const posts = await Post.find().populate("author", "username profilePicture");
  res.json(posts);
});

router.get("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    "author",
    "username profilePicture"
  );
  res.json(post);
});

router.post(
  "/posts",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    const newPost = new Post({
      title: req.body.title,
      desc: req.body.desc,
      content: req.body.content,
      image: req.file ? `/uploads/${req.file.filename}` : "",
      author: req.user._id,
    });
    await newPost.save();
    res.json(newPost);
  }
);

router.put("/posts/:id", authMiddleware, upload.single("image"), async (req, res) => {
  const updates = {
    title: req.body.title,
    desc: req.body.desc,
    content: req.body.content,
  };
  if (req.file) {
    updates.image = `/uploads/${req.file.filename}`;
  }
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, updates, {
    new: true,
  });
  res.json(updatedPost);
});

router.delete("/posts/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Пост не знайдено" });
    }

    if (post.image) {
      const imagePath = path.join(__dirname, post.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Помилка видалення файлу:", err);
        } else {
          console.log("Файл видалено:", imagePath);
        }
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: "Пост видалено" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Помилка сервера" });
  }
});

export default router;