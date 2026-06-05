require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/budgets", require("./routes/budgetRoutes"));
app.use("/api/insights", require("./routes/insightsRoutes"));

app.get("/", (req, res) => {
  res.json({ message: "Smart Expense Tracker API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
