const applicationRoutes = require("./routes/applicationRoutes");
const savedJobRoutes = require("./routes/savedJobRoutes");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();


// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("MeriJob API is running");
});
app.use("/api/applications", applicationRoutes);
app.use("/api/saved-jobs", savedJobRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "MeriJob API is running",
  });
});

// Job routes
app.use("/api/jobs", jobRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`MeriJob server running on port ${PORT}`);
});