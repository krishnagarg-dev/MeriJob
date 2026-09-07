const express = require("express");

const {
  applyForJob,
  getMyApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(authMiddleware, requireRole("seeker"));

router.post("/", applyForJob);
router.get("/", getMyApplications);
router.patch("/:id/status", updateApplicationStatus);

module.exports = router;
