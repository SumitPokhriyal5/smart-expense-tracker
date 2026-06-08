const Transaction = require("../models/Transaction");
const Budget = require("../models/Budget");
const mongoose = require("mongoose");

function monthBounds(monthStr) {
  const start = new Date(`${monthStr}-01T00:00:00.000Z`);
  const end = new Date(start);
  end.setUTCMonth(end.getUTCMonth() + 1);
  return { start, end };
}

function shiftMonth(monthStr, delta) {
  const d = new Date(`${monthStr}-01T00:00:00.000Z`);
  d.setUTCMonth(d.getUTCMonth() + delta);
  return d.toISOString().slice(0, 7);
}

async function totalsForMonth(userId, monthStr) {
  const { start, end } = monthBounds(monthStr);
  const result = await Transaction.aggregate([
    { $match: { user: userId, date: { $gte: start, $lt: end } } },
    { $group: { _id: "$type", total: { $sum: "$amount" } } },
  ]);
  let income = 0;
  let expense = 0;
  result.forEach((r) => {
    if (r._id === "income") income = r.total;
    if (r._id === "expense") expense = r.total;
  });
  return { income, expense };
}

const getInsights = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const month = req.query.month || new Date().toISOString().slice(0, 7);
    const prevMonth = shiftMonth(month, -1);

    const current = await totalsForMonth(userId, month);
    const previous = await totalsForMonth(
      userId,
      month === prevMonth ? month : prevMonth,
    );

    const hasData = current.income > 0 || current.expense > 0;

    const savings = current.income - current.expense;
    const savingsRate =
      current.income > 0 ? Math.round((savings / current.income) * 100) : 0;

    let expenseChange = null;
    if (previous.expense > 0) {
      expenseChange = Math.round(
        ((current.expense - previous.expense) / previous.expense) * 100,
      );
    }

    const { start, end } = monthBounds(month);
    const topCategoryAgg = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          type: "expense",
          date: { $gte: start, $lt: end },
        },
      },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } },
      { $limit: 1 },
    ]);
    const topCategory = topCategoryAgg[0]
      ? { category: topCategoryAgg[0]._id, amount: topCategoryAgg[0].total }
      : null;

    const now = new Date();
    const isCurrentMonth = month === now.toISOString().slice(0, 7);
    const daysInMonth = new Date(
      Number(month.slice(0, 4)),
      Number(month.slice(5, 7)),
      0,
    ).getDate();
    const dayOfMonth = isCurrentMonth ? now.getUTCDate() : daysInMonth;
    const dailyBurn =
      dayOfMonth > 0 ? Math.round(current.expense / dayOfMonth) : 0;
    const projectedExpense = isCurrentMonth
      ? dailyBurn * daysInMonth
      : current.expense;

    const budgets = await Budget.find({ user: userId, month });
    let overBudgetCount = 0;
    if (budgets.length > 0) {
      const spending = await Transaction.aggregate([
        {
          $match: {
            user: userId,
            type: "expense",
            date: { $gte: start, $lt: end },
          },
        },
        { $group: { _id: "$category", spent: { $sum: "$amount" } } },
      ]);
      const spentMap = {};
      spending.forEach((s) => (spentMap[s._id] = s.spent));
      budgets.forEach((b) => {
        if ((spentMap[b.category] || 0) > b.limit) overBudgetCount++;
      });
    }

    const messages = buildMessages({
      savingsRate,
      expenseChange,
      topCategory,
      projectedExpense,
      currentExpense: current.expense,
      isCurrentMonth,
      overBudgetCount,
      hasData,
    });

    res.json({
      month,
      income: current.income,
      expense: current.expense,
      savings,
      savingsRate,
      expenseChange,
      topCategory,
      dailyBurn,
      projectedExpense,
      overBudgetCount,
      messages,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

function buildMessages({
  savingsRate,
  expenseChange,
  topCategory,
  projectedExpense,
  currentExpense,
  isCurrentMonth,
  overBudgetCount,
  hasData,
}) {
  if (!hasData) {
    return [
      {
        type: "neutral",
        text: "Welcome! Add your first transaction to start seeing insights.",
      },
    ];
  }

  const messages = [];

  if (savingsRate >= 20) {
    messages.push({
      type: "positive",
      text: `Great job — you saved ${savingsRate}% of your income this month.`,
    });
  } else if (savingsRate > 0) {
    messages.push({
      type: "neutral",
      text: `You saved ${savingsRate}% of your income. Aim for 20% or more.`,
    });
  } else if (currentExpense > 0) {
    messages.push({
      type: "negative",
      text: `You spent more than you earned this month. Time to review expenses.`,
    });
  }

  if (expenseChange !== null) {
    if (expenseChange > 10) {
      messages.push({
        type: "negative",
        text: `Spending is up ${expenseChange}% compared to last month.`,
      });
    } else if (expenseChange < -10) {
      messages.push({
        type: "positive",
        text: `Spending is down ${Math.abs(expenseChange)}% versus last month. Nice.`,
      });
    } else {
      messages.push({
        type: "neutral",
        text: `Spending is roughly in line with last month.`,
      });
    }
  }

  if (topCategory) {
    messages.push({
      type: "neutral",
      text: `Your biggest expense category is ${topCategory.category}.`,
    });
  }

  if (isCurrentMonth && projectedExpense > currentExpense) {
    messages.push({
      type: "neutral",
      text: `At your current pace, you're projected to spend around ₹${projectedExpense.toLocaleString("en-IN")} this month.`,
    });
  }

  if (overBudgetCount > 0) {
    messages.push({
      type: "negative",
      text: `You've exceeded ${overBudgetCount} budget${overBudgetCount > 1 ? "s" : ""} this month.`,
    });
  }

  return messages;
}

module.exports = { getInsights };
