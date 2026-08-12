
const express = require("express");

const {
  saveJob,
  getSavedJobs,
  removeSavedJob,
} = require("../controllers/savedJobController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", saveJob);
router.get("/", getSavedJobs);
router.delete("/:jobId", removeSavedJob);

module.exports = router;
