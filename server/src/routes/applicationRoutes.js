
const express = require("express");

const {
  applyForJob,
  getMyApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validate = require("../middleware/validate");

const {
  applicationSchema,
  applicationStatusSchema,
} = require("../schemas/applicationSchema");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("seeker"),
  validate(applicationSchema),
  applyForJob
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("seeker"),
  getMyApplications
);

router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("seeker"),
  validate(applicationStatusSchema),
  updateApplicationStatus
);

module.exports = router;