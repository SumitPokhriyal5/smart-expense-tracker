const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  exportTransactions,
} = require("../controllers/transactionController");
const protect = require("../middleware/authMiddleware");

router.use(protect);

router.get("/export", exportTransactions);
router.post("/", createTransaction);
router.get("/", getTransactions);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;
