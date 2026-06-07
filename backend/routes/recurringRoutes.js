const express = require("express");
const router = express.Router();
const {
  createRecurring,
  getRecurring,
  deleteRecurring,
  generateTransaction,
} = require("../controllers/recurringController");
const protect = require("../middleware/authMiddleware");

router.use(protect);

router.post("/", createRecurring);
router.get("/", getRecurring);
router.post("/:id/generate", generateTransaction);
router.delete("/:id", deleteRecurring);

module.exports = router;
