const express = require("express");
const router = express.Router();
const {
  getSummary,
  getCategoryBreakdown,
  getMonthlyTrends,
} = require("../controllers/analyticsController");
const protect = require("../middleware/authMiddleware");

router.use(protect);

router.get("/summary", getSummary);
router.get("/category", getCategoryBreakdown);
router.get("/monthly", getMonthlyTrends);

module.exports = router;
