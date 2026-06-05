const Transaction = require("../models/Transaction");

const createTransaction = async (req, res) => {
  try {
    const { type, amount, category, note, date, paymentMethod, tags } =
      req.body;

    if (!type || !amount || !category) {
      return res
        .status(400)
        .json({ message: "Type, amount and category are required" });
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      type,
      amount,
      category,
      note,
      paymentMethod,
      tags,
      date: date || Date.now(),
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const {
      type,
      category,
      paymentMethod,
      search,
      startDate,
      endDate,
      sortBy = "date",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const filter = { user: req.user._id };
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (paymentMethod) filter.paymentMethod = paymentMethod;

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [{ note: regex }, { category: regex }, { tags: regex }];
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Math.min(100, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const sortOptions = {};
    const allowedSort = ["date", "amount", "category"];
    sortOptions[allowedSort.includes(sortBy) ? sortBy : "date"] =
      order === "asc" ? 1 : -1;

    const [transactions, total] = await Promise.all([
      Transaction.find(filter).sort(sortOptions).skip(skip).limit(limitNum),
      Transaction.countDocuments(filter),
    ]);

    res.json({
      transactions,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await transaction.deleteOne();
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const exportTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({
      date: -1,
    });

    const header = [
      "Date",
      "Type",
      "Category",
      "Amount",
      "Payment Method",
      "Note",
      "Tags",
    ];
    const rows = transactions.map((t) => [
      new Date(t.date).toISOString().slice(0, 10),
      t.type,
      t.category,
      t.amount,
      t.paymentMethod,
      `"${(t.note || "").replace(/"/g, '""')}"`,
      `"${(t.tags || []).join(", ")}"`,
    ]);

    const csv = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="transactions.csv"'
    );
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  exportTransactions,
};
