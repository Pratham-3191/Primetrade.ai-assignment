const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const serverless = require("serverless-http");

const authRoutes = require("../../routes/auth.routes");
const taskRoutes = require("../../routes/task.routes");

dotenv.config();

const app = express();

const MONGO_URL = process.env.MONGO_URL;
const CLIENT_URL = process.env.CLIENT_URL || "https://primetrade-assignment-flame.vercel.app";

// CORS middleware
app.use(cors({
  origin: CLIENT_URL,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

// Preflight OPTIONS requests
app.options('*', cors());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Root route
app.get("/", (req, res) => res.send("API is running"));

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Connect to MongoDB safely
mongoose.connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection failed:", err));

// Wrap Express app for Vercel serverless
module.exports = serverless(app);
