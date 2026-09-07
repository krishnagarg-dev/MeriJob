const express = require("express");
const { getMyCompany, createOrUpdateCompany } = require("../controllers/companyController");
const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const router = express.Router();
router.use(authMiddleware, requireRole("employer"));
router.get("/", getMyCompany);
router.post("/", createOrUpdateCompany);
module.exports = router;
