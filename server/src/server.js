const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const applicationRoutes = require("./routes/applicationRoutes");
const savedJobRoutes = require("./routes/savedJobRoutes");
const companyRoutes = require("./routes/companyRoutes");
const employerJobRoutes = require("./routes/employerJobRoutes");
const employerApplicationRoutes = require("./routes/employerApplicationRoutes");
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Connect MongoDB
connectDB();

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://meri-job.vercel.app",
];

// CORS
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests from tools such as curl/Postman
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: true,
  })
);

// JSON parser
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("MeriJob API is running");
});

// Authentication
app.use("/api/auth", authRoutes);

// Job seeker
app.use("/api/applications", applicationRoutes);
app.use("/api/saved-jobs", savedJobRoutes);

// Company
app.use("/api/company", companyRoutes);

// Employer jobs
app.use("/api/employer/jobs", employerJobRoutes);

// Employer applications
app.use(
  "/api/employer/applications",
  employerApplicationRoutes
);

// Public jobs
app.use("/api/jobs", jobRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "MeriJob API is running",
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `MeriJob server running on port ${PORT}`
  );
});