import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  desc: String,
  content: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Post", postSchema);
