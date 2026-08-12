const express = require("express");

const {
  applyForJob,
  getMyApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", applyForJob);
router.get("/", getMyApplications);
router.patch("/:id/status", updateApplicationStatus);

module.exports = router;