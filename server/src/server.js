const applicationRoutes = require("./routes/applicationRoutes");
const savedJobRoutes = require("./routes/savedJobRoutes");
const companyRoutes = require("./routes/companyRoutes");
const employerJobRoutes = require("./routes/employerJobRoutes");
const employerApplicationRoutes = require("./routes/employerApplicationRoutes");

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
app.use(
  cors({
    origin: "https://meri-job.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Root route
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("MeriJob API is running");
});
app.use("/api/applications", applicationRoutes);
app.use("/api/saved-jobs", savedJobRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/employer/jobs", employerJobRoutes);
app.use("/api/employer/applications", employerApplicationRoutes);

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
