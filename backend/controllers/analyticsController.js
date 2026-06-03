const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");

const getSummary = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const result = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    let totalIncome = 0;
    let totalExpense = 0;
    result.forEach((item) => {
      if (item._id === "income") totalIncome = item.total;
      if (item._id === "expense") totalExpense = item.total;
    });

    res.json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getCategoryBreakdown = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const type = req.query.type || "expense";

    const breakdown = await Transaction.aggregate([
      { $match: { user: userId, type } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      { $sort: { total: -1 } },
    ]);

    const formatted = breakdown.map((item) => ({
      category: item._id,
      total: item.total,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getMonthlyTrends = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const trends = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const monthsMap = {};
    trends.forEach((item) => {
      const key = `${item._id.year}-${String(item._id.month).padStart(2, "0")}`;
      if (!monthsMap[key]) {
        monthsMap[key] = { month: key, income: 0, expense: 0 };
      }
      monthsMap[key][item._id.type] = item.total;
    });

    res.json(Object.values(monthsMap));
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getSummary, getCategoryBreakdown, getMonthlyTrends };
