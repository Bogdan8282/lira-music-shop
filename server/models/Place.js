import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Place", placeSchema);
