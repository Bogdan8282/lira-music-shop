import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import placeRoutes from "./routes/places.js";
import blogRoutes from "./routes/blog.js";
import authMiddleware from "./middleware/authMiddleware.js";
import connectDB from "./config/db.js";
import routes from "./routes/routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions =
  process.env.NODE_ENV === "production"
    ? {
        origin: process.env.CORS_ORIGIN
          ? process.env.CORS_ORIGIN.split(",")
          : "*",
        credentials: true,
        optionsSuccessStatus: 200,
      }
    : {
        origin: "http://localhost:5173",
        credentials: true,
        optionsSuccessStatus: 200,
      };

app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

connectDB();

app.use("/api", routes);
app.use("/api/auth", authRoutes);
app.use("/api/", placeRoutes);
app.use("/api", blogRoutes);

if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "../client/dist");
  app.use(express.static(clientPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({ message: "Server is running in development mode" });
  });
}

app.get("/api/current", authMiddleware, (req, res) => {
  res.json(req.user);
});

app.listen(PORT, () =>
  console.log(
    `Server running on http://localhost:${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  )
);