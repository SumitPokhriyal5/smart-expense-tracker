const RecurringTransaction = require("../models/RecurringTransaction");
const Transaction = require("../models/Transaction");

const createRecurring = async (req, res) => {
  try {
    const { type, amount, category, note, dayOfMonth } = req.body;
    if (!type || !amount || !category) {
      return res
        .status(400)
        .json({ message: "Type, amount and category are required" });
    }
    const recurring = await RecurringTransaction.create({
      user: req.user._id,
      type,
      amount,
      category,
      note,
      dayOfMonth: dayOfMonth || 1,
    });
    res.status(201).json(recurring);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getRecurring = async (req, res) => {
  try {
    const items = await RecurringTransaction.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteRecurring = async (req, res) => {
  try {
    const item = await RecurringTransaction.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await item.deleteOne();
    res.json({ message: "Recurring transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const generateTransaction = async (req, res) => {
  try {
    const item = await RecurringTransaction.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const now = new Date();
    const date = new Date(now.getFullYear(), now.getMonth(), item.dayOfMonth);

    const transaction = await Transaction.create({
      user: req.user._id,
      type: item.type,
      amount: item.amount,
      category: item.category,
      note: item.note,
      date,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createRecurring,
  getRecurring,
  deleteRecurring,
  generateTransaction,
};
