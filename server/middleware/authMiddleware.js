import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json("No token, authorization denied");

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json("Token is not valid");
  }
};

export default authMiddleware;
