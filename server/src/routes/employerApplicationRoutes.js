const express = require("express");
const { getApplications, updateStatus } = require("../controllers/employerApplicationController");
const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const router = express.Router();
router.use(authMiddleware, requireRole("employer"));
router.get("/", getApplications);
router.patch("/:id/status", updateStatus);
module.exports = router;
