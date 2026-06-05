const Budget = require("../models/Budget");
const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");

function currentMonth() {
  return new Date().toISOString().slice(0, 7);
}

const setBudget = async (req, res) => {
  try {
    const { category, limit, month } = req.body;

    if (!category || limit == null) {
      return res
        .status(400)
        .json({ message: "Category and limit are required" });
    }

    const targetMonth = month || currentMonth();

    const budget = await Budget.findOneAndUpdate(
      { user: req.user._id, category, month: targetMonth },
      { limit },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getBudgets = async (req, res) => {
  try {
    const month = req.query.month || currentMonth();
    const budgets = await Budget.find({ user: req.user._id, month }).sort({
      category: 1,
    });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    if (budget.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await budget.deleteOne();
    res.json({ message: "Budget deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getBudgetStatus = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const month = req.query.month || currentMonth();

    const start = new Date(`${month}-01T00:00:00.000Z`);
    const end = new Date(start);
    end.setUTCMonth(end.getUTCMonth() + 1);

    const budgets = await Budget.find({ user: userId, month }).sort({
      category: 1,
    });

    const spending = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          type: "expense",
          date: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: "$category",
          spent: { $sum: "$amount" },
        },
      },
    ]);

    const spentByCategory = {};
    spending.forEach((s) => {
      spentByCategory[s._id] = s.spent;
    });

    const status = budgets.map((b) => {
      const spent = spentByCategory[b.category] || 0;
      const percentage = b.limit > 0 ? Math.round((spent / b.limit) * 100) : 0;
      let state = "ok";
      if (spent > b.limit) state = "over";
      else if (percentage >= 80) state = "warning";

      return {
        _id: b._id,
        category: b.category,
        limit: b.limit,
        spent,
        remaining: b.limit - spent,
        percentage,
        state,
      };
    });

    res.json(status);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { setBudget, getBudgets, deleteBudget, getBudgetStatus };
